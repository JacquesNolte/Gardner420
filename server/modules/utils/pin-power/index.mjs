import { Gpio } from 'onoff'

export class PinPower {

  async on (device) {
    const gpioDevice = new Gpio(4, 'out')

    await gpioDevice.writeSync(1)

    // await gpioDevice.unexport()

    return true
  }

  async off (device) {
    const gpioDevice = new Gpio(4, 'out')

    await gpioDevice.writeSync(0)

    // await gpioDevice.unexport()

    return true
  }

  async toggle (device) {
    if (await this.get(device)) await this.off(device)
    else await this.on(device)

    return true
  }

  async get (device) {
    const gpioDevice = new Gpio(device.gpioPin, 'out')
    const value = await gpioDevice.read()

    await gpioDevice.unexport()

    return value
  }

}
