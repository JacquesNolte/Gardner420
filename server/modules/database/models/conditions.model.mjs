import { DateTime } from 'luxon'
import mongoose from 'mongoose'

const { Schema } = mongoose

export const conditionsSchema = new Schema({
  type: 'array',
  grows: {
  type: 'object',
    properties: {
      growName: { type: 'string' },
      startDate: { type: 'string' },
      endDate: { type: 'string' },
      plantType: { type: 'string' },
      type: 'array',
      pots: {
        type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            strain: { type: 'string' },
            litres: { type: 'number' },
            substrate: { type: 'string' },
            position: { type: 'string' },
            yield: {
              type: 'object',
              properties: {
                cured: { type: 'string' },
                harvest: { type: 'string' }
              }
            }
          }
      },
      nutrients: { type: 'string' },
      substrate: { type: 'string' },
      type: 'array',
      cycles: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          photoUrls: { type: 'array' },           
          conditions: {
            type: 'object',
            properties: {
              day: {
                type: 'object',
                properties: {
                  temperature: { type: 'number' },
                  temperatureOffset: { type: 'number' },
                  humidity:{ type: 'number' },
                  humidityOffset: { type: 'number' },
                  vpd: { type: 'number' }
                }
              },
              night: {
                type: 'object',
                properties: {
                  temperature: { type: 'number' },
                  temperatureOffset: { type: 'number' },
                  humidity:{ type: 'number' },
                  humidityOffset: { type: 'number' },
                  vpd: { type: 'number' }
                }
              },
              lightSchedule: {
                type: 'object',
                properties: {
                  day: { type: 'number' },
                  night: { type: 'number' },
                }
              },
              startDate: { type: string }
            }
          }
        }
      }
    }
  }
}, { skipVersioning: true, versionKey: false, timestamps: true })

export default conditionsSchema
