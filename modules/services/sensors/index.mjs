import { BaseService } from '../base.service.mjs'

let bmeSensor = await bme.open({
  humidityOversampling: bme.OVERSAMPLE.X4,
  pressureOversampling: bme.OVERSAMPLE.X4,
  temperatureOversampling: bme.OVERSAMPLE.X4
})

export class Sensors extends BaseService {

  async initialiseConnection () {
    bmeSensor = await bme.open({
      humidityOversampling: bme.OVERSAMPLE.X4,
      pressureOversampling: bme.OVERSAMPLE.X4,
      temperatureOversampling: bme.OVERSAMPLE.X4
    })
  }

  async readEnvironmentalData (insertIntoDb = false) {
    const environmentData = await bmeSensor.read()
    const soilMoisture = await this.readSoilMoisture()
    if (insertIntoDb) await this.models.values.create({
      temperature: environmentData.temperature,
      humidity: environmentData.humidity,
      soilMoisture
    })

    return { ...environmentData, soilMoisture }
  }

  async readSoilMoisture () {
    return await this.utils.soilMoisture.getMoistureData()
  }

}

async function graceful () {
  await bmeSensor.close()
  process.exit(0)
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)
