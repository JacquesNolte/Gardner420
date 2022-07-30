import * as path from 'path'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCors from '@fastify/cors'
import config from './config/default.mjs'
import { connectToDatabase, setupRoutes, utils } from './modules'
import { startSchedules } from './modules/utils/scheduler/index.mjs'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

if (!process.env.APP_ENV) process.env.APP_ENV = 'default'
if (!process.env.APP_ROOT) process.env.APP_ROOT = path.resolve(__dirname)
if (!process.env.APP_CONFIG) process.env.APP_CONFIG = path.join(process.env.APP_ROOT, 'config', `${process.env.APP_ENV}.mjs`)

const fastify = Fastify(config.server.options)
fastify.decorate('_config', config)

await connectToDatabase(fastify, config.db)

await fastify.register(utils)

fastify.register(fastifyCors, {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE'
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'static'),
  prefix: '/web', // optional: default '/'
  index: 'index.html'
})

fastify.register(setupRoutes, { prefix: '/api', logLevel: 'error' })

await startSchedules(fastify)

fastify.setErrorHandler(function (error, request, reply) {
  fastify.log.error(error)
  if (error.statusCode) {
    reply.code(error.statusCode).send({ success: false, error: { name: error.name, message: error.message } })
  } else {
    reply.code(500).send({ success: false, error: { name: error.name, message: error.message } })
  }
})

fastify.setNotFoundHandler(function (request, reply) {
  reply.code(404).send({ success: false, error: { name: 'NotFound', message: 'Not Found' } })
})

await fastify.listen(config.server.port, config.server.host)
console.log(fastify.printRoutes())
fastify.log.info(`Started Server in '${process.env.APP_ENV}' mode on Port ${config.server.port}!`)
