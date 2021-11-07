import { Devices } from '../../services'

export async function routes (fastify, opts, next) {
  const devices = new Devices(fastify)

  fastify.post('/devices/retrieve', async function (request, reply) {
    reply.send({
      success: true,
      data: { devices: await devices.getDevices() }
    })
  })

  fastify.post('/devices/create', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await devices.createDevice(request.body) }
    })
  })

  fastify.post('/devices/delete', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await devices.deleteDevice(request.body) }
    })
  })

  fastify.post('/devices/set-state', async function (request, reply) {
    reply.send({
      success: true,
      data: { device: await devices.setDeviceState(request.body) }
    })
  })

  next()
}
