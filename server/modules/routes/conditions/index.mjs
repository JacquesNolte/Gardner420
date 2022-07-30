import { Conditions } from '../../services/index.mjs'

export async function routes (fastify, opts, next) {
  const conditions = new Conditions(fastify)

  fastify.post('/conditions/retrieve', async function (request, reply) {
    reply.send({
      success: true,
      data: { conditions: await conditions.getConditions() }
    })
  })

  fastify.post('/conditions/set-temperature', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await conditions.setTemperature(request.body) }
    })
  })

  fastify.post('/conditions/set-humidity', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await conditions.setHumidity(request.body) }
    })
  })

  fastify.post('/conditions/set-soil-moisture', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await conditions.setSoilMoisture(request.body) }
    })
  })

  fastify.post('/conditions/set-light-cycle', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await conditions.setLightCycle(request.body) }
    })
  })

  next()
}
