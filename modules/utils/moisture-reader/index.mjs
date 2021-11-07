import i2c from 'i2c-bus'
import ADS1115 from 'ads1115'

export class MoistureReader {

  constructor (fastify) {
    this.config = fastify._config.soilMoistureSensor
  }

  async getMoistureData () {
    const bus = await i2c.openPromisified(this.config.gpioPin)
    const sensor = ADS1115(bus)
    const sensorValue = await sensor.measure('0+GND')
    const promiseBus = bus.promisifiedBus()

    promiseBus.close()

    const moistureLevel = Math.abs((sensorValue - this.config.zeroSaturation / (this.config.fullSaturation - this.config.zeroSaturation))) * 100

    return Math.round(moistureLevel)
  }
}
