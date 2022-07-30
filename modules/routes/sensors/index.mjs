import { Sensors } from '../../services/index.mjs'

export async function routes (fastify, opts, next) {
  const sensors = new Sensors(fastify)

  fastify.post('/sensors/retrieve', async function (request, reply) {
    reply.send({
      success: true,
      data: await sensors.readEnvironmentalData()
    })
  })

  next()
}
