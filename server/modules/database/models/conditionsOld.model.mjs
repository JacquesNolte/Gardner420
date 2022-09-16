import mongoose from 'mongoose'

const { Schema } = mongoose

const minMaxSchema = new Schema({
  min: {
    type: Schema.Types.Number,
    required: true,
    default: 0
  },
  max: {
    type: Schema.Types.Number,
    required: true,
    default: 0
  }
}, { _id: false })

export const conditionsSchema = new Schema({
  temperature: {
    type: minMaxSchema,
    default: {
      min: 18,
      max: 28
    }
  },
  humidity: {
    type: minMaxSchema,
    default: {
      min: 45,
      max: 65
    }
  },
  vpd: {
    type: Schema.Types.Number,
    default: 1
  },
  soilMoisture: {
    type: minMaxSchema,
    default: {
      min: 40,
      max: 80
    }
  },
  dayNightCycle: {
    type: new Schema({
      day: {
        type: Schema.Types.Number,
        required: true,
        default: 8,
        min: 0,
        max: 23
      },
      night: {
        type: Schema.Types.Number,
        required: true,
        default: 16,
        min: 0,
        max: 23
      }
    }, { _id: false }),
    default: {
      day: 16,
      night: 8
    }
  }
}, { skipVersioning: true, versionKey: false, timestamps: true })

export default conditionsSchema
