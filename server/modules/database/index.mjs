import mongoose from 'mongoose'
import models from './models'

export async function connectToDatabase (fastify, config) {
  return new Promise(async (resolve, reject) => {
    let db
    try {
      db = await mongoose.createConnection(config.uri, config.options)
      fastify.log.info(`Connecting to database`)

    } catch (error) {
      fastify.log.error(`Could not connect to database`)
      fastify.log.error(error)
      reject(error)
      process.exit(1)
    }

    // When successfully connected
    db.on('connected', async () => {
      fastify.log.info('Connected to database')
      // Initialise models
      for (const model in models) {
        await db.model(models[model].referenceKey, await models[model].schema())
      }

      resolve(true)
    })

    // When successfully reconnected
    db.on('reconnected', () => {
      fastify.log.info(`Database connection reconnected`)
    })

    // When the connection is disconnected
    db.on('disconnected', () => {
      fastify.log.warn(`Database connection disconnected`)
    })

    fastify.addHook('onClose', () => {
      db.close()
    })

    fastify.decorate('_db', db)

  })
}
