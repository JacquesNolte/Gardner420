import { Agenda } from 'agenda/es'
import { Conditions, Devices, Sensors } from '../../services'
import { DateTime, Interval } from 'luxon'

export async function startSchedules (fastify) {
  const agenda = new Agenda(fastify._config.scheduler)
  const sensors = new Sensors(fastify)
  const conditions = new Conditions(fastify)
  const devices = new Devices(fastify)

  await new Promise(resolve => agenda.on('ready', resolve))

  agenda.define('monitorSensorData', async () => {
    const { temperature, humidity } = await sensors.readEnvironmentalData()

    const conditionsData = await conditions.getConditions()
    const deviceData = await devices.getDevices()

    const heaters = deviceData.find(device => device.category === 'heater')
    const fans = deviceData.find(device => device.category === 'extractor_fan')

    if (temperature <= conditionsData.temperature.min) {

      if(heaters.length > 1){
        for (const heater of heaters) await devices.setDeviceStateOn(heater)
      }else{
        await devices.setDeviceStateOn(heaters)
      }

      if(fans.length > 1){
        for (const fan of fans) if (!fan.keepActive) await devices.setDeviceStateOff(fan)
      } else {
        if (!fans.keepActive) await devices.setDeviceStateOff(fans)
      }
      
    } else if (temperature >= conditionsData.temperature.max) {

      if(heaters.length > 1){
        for (const heater of heaters) if (!heater.keepActive) await devices.setDeviceStateOff(heater)
      } else {
        if (!heaters.keepActive) await devices.setDeviceStateOff(heaters)
      }

      if(fans.length > 1){
        for (const fan of fans) await devices.setDeviceStateOn(fan)
      } else {
        await devices.setDeviceStateOn(fans)
      }
    }

    const humidifiers = deviceData.find(device => device.category === 'humidifier')

    if (humidity <= conditionsData.humidity.min) {

      if(humidifiers.length > 1){
        for (const humidifier of humidifiers) await devices.setDeviceStateOn(humidifier)
      } else {
        await devices.setDeviceStateOn(humidifiers)
      }

      
    } else if (humidity >= conditionsData.humidity.max) {

      if(humidifiers.length > 1){
        for (const humidifier of humidifiers) if (!humidifier.keepActive) await devices.setDeviceStateOff(humidifier)
      } else {
        if (!humidifiers.keepActive) await devices.setDeviceStateOff(humidifiers)
      }

    }

    // ToDo(Reach for the Stars): soil moisture, ph, ec implementation with pumps
  })

  agenda.define('saveSensorData', async () => {
    await sensors.readEnvironmentalData(true)
  })

  agenda.define('lightCycle', async () => {
    const conditionsData = await conditions.getConditions()

    const now = DateTime.now().plus({ hours: 2 })
    const day = DateTime.local().startOf('day').set({ hour: conditionsData.dayNightCycle.day })
    let night = DateTime.local().endOf('day').set({ hour: conditionsData.dayNightCycle.night })


    if(day > night){
      night = night.plus({ days: 1 })
    }

    const dayToNight = Interval.fromDateTimes(day, night)

    const turnOnLights = async () => {
      const deviceData = await devices.getDevices()
      const lights = deviceData.find(device => device.category === 'light')

      if (lights.length > 1){
        for (const light of lights){
          await devices.setDeviceStateOn(light)
        } 
      }else{
        await devices.setDeviceStateOn(lights)
      }
    }

    const turnOffLights = async () => {
      const deviceData = await devices.getDevices()
      const lights = deviceData.find(device => device.category === 'light')

      if (lights.length > 1){
        for (const light of lights){
          if (!light.keepActive) await devices.setDeviceStateOff(light)
        } 
      }else{
        if (!lights.keepActive) await devices.setDeviceStateOff(lights)
      }
    }

    if (dayToNight.contains(now)) await turnOnLights()
    else await turnOffLights()
  })

  agenda.define('fanCirculation', async () => {
    const deviceData = await devices.getDevices()

    const fans = deviceData.find(device => device.category === 'circulation_fan')

    if(fans.length > 1){
      for (const fan of fans) await devices.toggleDeviceState(fan)
    } else {
      await devices.toggleDeviceState(fans)
    }
    
  })

  await agenda.every('2 seconds', 'monitorSensorData')
  await agenda.every('10 seconds', ['saveSensorData', 'lightCycle'])
  await agenda.every('5 minutes', 'fanCirculation')

  async function graceful () {
    await agenda.stop()
    process.exit(0)
  }

  process.on('SIGTERM', graceful)
  process.on('SIGINT', graceful)

  fastify.log.info('Starting Scheduler')
  return await agenda.start()
}
