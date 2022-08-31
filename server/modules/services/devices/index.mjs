import { BaseService } from '../base.service.mjs'

export class Devices extends BaseService {

  async createDevice (params) {
    return await this.models.devices.create({
      name: params.name,
      category: params.category,
      pin: params.pin,
      gpioPin: params.gpioPin,
      relay: params.relay
    })
  }

  async updateDevice (params) {
    const device = await this.models.devices.findOneAndUpdate({ name: params.name }, {
      name: params.name,
      category: params.category,
      pin: params.pin,
      gpioPin: params.gpioPin,
      keepActive: params.keepActive,
      relay: params.relay
    }, { new: true })
    if (!device) throw Error('Device not found!')
  }

  async setDeviceState (params) {
    const device = await this.models.devices.findOneAndUpdate({ name: params.name }, {
      active: params.active,
      keepActive: params.keepActive
    }, { new: true })
    if (!device) throw Error('Device not found!')

    params.active ? await this.utils.pinPower.on(device) : await this.utils.pinPower.off(device)

    return device
  }

  async setDeviceStateOn (params) {
    return this.setDeviceState({ ...params, active: true })
  }

  async setDeviceStateOff (params) {
    return this.setDeviceState({ ...params, active: false })
  }

  async toggleDeviceState (params) {
    const device = await this.models.devices.findOneAndUpdate({ name: params.name }, {
      active: !params.active,
    }, { new: true })
    if (!device) throw Error('Device not found!')

    device.active ? await this.utils.pinPower.on(device) : await this.utils.pinPower.off(device)

    return device
  }

  async getDevices () {
    return await this.models.devices.find().lean()
  }

  async getCategories () {
    return [
      { value: 'switch', label: 'Switch' },
      { value: 'extractor_fan', label: 'Extractor Fan' },
      { value: 'circulation_fan', label: 'Circulation Fan' },
      { value: 'heater', label: 'Heater' },
      { value: 'humidifier', label: 'Humidifier' },
      { value: 'dehumidifier', label: 'Dehumidifier' },
      { value: 'heating_pad', label: 'Heating Pad' },
      { value: 'pump', label: 'Pump'},
      { value: 'air_pump', label: 'Air Pump'},
      { value: 'light', label: 'Light'}
    ]
  }

  async deleteDevice (params) { // name
    return this.models.devices.findOneAndDelete({ name: params.name })
  }

}

