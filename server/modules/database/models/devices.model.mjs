import mongoose from 'mongoose'

const { Schema } = mongoose

export const devicesSchema = new Schema({
  name: {
    type: Schema.Types.String,
    unique: true,
    minlength: 3,
    maxlength: 25
  },
  category: {
    type: Schema.Types.String,
    required: true,
    enum: [
      'switch',
      'extractor_fan',
      'circulation_fan',
      'heater',
      'humidifier',
      'dehumidifier',
      'heating_pad',
      'pump',
      'air_pump',
      'light'
    ],
    default: 'switch'
  },
  pin: {
    type: Schema.Types.Number,
    unique: true,
    min: 1,
    max: 40
  },
  gpioPin: {
    type: Schema.Types.Number,
    unique: true,
    min: 2,
    max: 27
  },
  active: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  keepActive: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  relay: {
    type: Schema.Types.String,
    required: true,
    enum: [
      'R1',
      'R2',
      'R3',
      'R4',
      'R5',
      'R6',
      'R7',
      'R8',
      'R9',
      'R10',
      'R11',
      'R12'
    ],
    default: 'switch'
  }
}, { skipVersioning: true, versionKey: false, timestamps: true })

export default devicesSchema
