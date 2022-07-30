import mongoose from 'mongoose'

const { Schema } = mongoose

export const valuesSchema = new Schema({
  temperature: {
    type: Schema.Types.Number,
    required: true,
  },
  humidity: {
    type: Schema.Types.Number,
    required: true,
  },
  soilMoisture: {
    type: Schema.Types.Number,
    required: true,
  }
}, { skipVersioning: true, versionKey: false, timestamps: true })

export default valuesSchema
