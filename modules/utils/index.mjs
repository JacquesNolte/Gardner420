import { default as fastifyPlugin } from 'fastify-plugin'
import { PinPower } from './pin-power'
import { MoistureReader } from './moisture-reader'

export const utils = fastifyPlugin(async function (fastify, opts, next) {
  let utils = {
    pinPower: new PinPower(),
    moistureReader: new MoistureReader(fastify),
  }

  fastify.decorate('utils', utils)

  next()
})
