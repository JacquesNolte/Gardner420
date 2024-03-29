import { join } from 'path'
import { readdir, stat } from 'fs/promises'

const getAllRouteDirectories = async (path) => {
  let dirs = []
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file]
    }
  }
  return dirs
}

export async function setupRoutes (fastify, opts, next) {
  fastify.get('/', function (request, reply) {
    reply.send({ root: true })
  })

  let routes = await getAllRouteDirectories(`${process.env.APP_ROOT}/modules/routes`)

  for (let route of routes) {
    const routeFunction = () => import(`./${route}`).then(m => m.routes)
    fastify.register(await routeFunction())
  }

  fastify.setNotFoundHandler(function (request, reply) {
    reply.code(404).send({ success: false, error: { name: 'NotFound', message: 'Not Found' } })
  })

  next()
}
