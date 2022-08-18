import { BaseService } from '../base.service.mjs'
import * as bme from 'bme280'

let bmeSensor = await bme.open({
  i2cBusNumber: 1,
  humidityOversampling: bme.OVERSAMPLE.X4,
  pressureOversampling: bme.OVERSAMPLE.X4,
  temperatureOversampling: bme.OVERSAMPLE.X4
})

export class Sensors extends BaseService {

  async initialiseConnection () {
    bmeSensor = await bme.open({
      i2cBusNumber: 1,
      humidityOversampling: bme.OVERSAMPLE.X4,
      pressureOversampling: bme.OVERSAMPLE.X4,
      temperatureOversampling: bme.OVERSAMPLE.X4
    })
  }

  async readEnvironmentalData (insertIntoDb = false) {
    const environmentData = await bmeSensor.read()

    environmentData.vpd = await this.calculateVPD(environmentData.temperature, environmentData.humidity)

    const soilMoisture = 0
    if (insertIntoDb) await this.models.values.create({
      temperature: environmentData.temperature,
      humidity: environmentData.humidity,
      vpd: environmentData.vpd,
      soilMoisture
    })

    return { ...environmentData, soilMoisture }
  }

  async readSoilMoisture () {
    return await this.utils.moistureReader.getMoistureData()
  }

  async calculateVPD(temperature, humidity) {
    const VPsat = 610.7 * 107.5 * temperature / (237.3 + temperature)  // Saturation vapor pressure in Pascals
    const VPactual = (humidity * VPsat) / 100.0  // Actual vapor pressure in Pascals
    const vpd = ((100.0 - hum) /100.0) * VPsat // Vapor Pressure Deficit in Pascals

    return vpd
  }

}

async function graceful () {
  await bmeSensor.close()
  process.exit(0)
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)
