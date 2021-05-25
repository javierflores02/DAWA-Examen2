import MongoLib from '../../../lib/mongo'

class MongoEntityRepository {
  constructor () {
    this.collection = 'entity'
    this.mongoDB = new MongoLib()
  }

  async add (entity) {
    const id = await this.mongoDB.create(this.collection, entity)
    return { id, ...entity }
  }

  async delete (id) {
    const idx = await this.mongoDB.delete(this.collection, id)
    return { idx }
  }

  async get (id) {
    const entity = await this.mongoDB.get(this.collection, id)
    return { entity }
  }

  async getAll () {
    const entities = await this.mongoDB.getAll(this.collection)
    return { entities }
  }

  async update ( id, data ) {
    return this.mongoDB.update(this.collection, id, data)
  }
}

export default MongoEntityRepository
