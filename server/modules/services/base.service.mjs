export class BaseService {
  constructor (fastify) {
    this.models = fastify?._db?.models
    this.db = fastify?._db
    this.utils = fastify?.utils
    this.log = fastify?._log
  }
}
