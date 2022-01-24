import { BaseService } from '../base.service.mjs'

export class Conditions extends BaseService {

  async setTemperature (params) {
    let conditions = await this.models.conditions.findOne().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-_id']).lean()
    conditions = conditions || { temperature: { max: 1, min: 0 } }

    switch (params) {
      case params.max <= params.min:
        throw Error(`The max temperature must be greater than the min temperature`)
      case params.max >= 30:
        throw Error('The max temperature must be below 30°C')
      case params.min <= 14:
        throw Error(`The min temperature must be above 14°C'`)
      default:
        conditions.temperature = { max: params.max, min: params.min }
        break
    }

    return this.models.conditions.create(conditions)
  }

  async setHumidity (params) { // min: number, max: number
    let conditions = await this.models.conditions.findOne().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-_id']).lean()
    conditions = conditions || { humidity: { max: 1, min: 0 } }

    switch (params) {
      case params.max <= params.min:
        throw Error(`The max humidity must be greater than the min humidity`)
      case params.max >= 80:
        throw Error('The max humidity must be below 80%')
      case params.min <= 30:
        throw Error(`The min humidity must be above 30%'`)
      default:
        conditions.humidity = { max: params.max, min: params.min }
        break
    }

    return this.models.conditions.create(conditions)
  }

  async setSoilMoisture (params) { // min: number, max: number
    let conditions = await this.models.conditions.findOne().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-_id']).lean()
    conditions = conditions || { soilMoisture: { max: 1, min: 0 } }

    switch (params) {
      case params.max <= params.min:
        throw Error(`The max soilMoisture must be greater than the min humidity`)
      case params.max >= 80:
        throw Error('The max soilMoisture must be below 80%')
      case params.min <= 30:
        throw Error(`The min soilMoisture must be above 30%'`)
      default:
        conditions.soilMoisture = { max: params.max, min: params.min }
        break
    }

    return this.models.conditions.create(conditions)
  }

  async setLightCycle (params) { // day: number, night: number
    let conditions = await this.models.conditions.findOne().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-_id']).lean()
    conditions = conditions || { dayNightCycle: { day: 1, night: 0 } }
    conditions.dayNightCycle = { day: params.day, night: params.night }
    
    return this.models.conditions.create(conditions)
  }

  async getConditions () {
    return await this.models.conditions.findOne().sort({ createdAt: -1 }).lean()
  }

}

