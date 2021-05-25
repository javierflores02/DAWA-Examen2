import MongoLib from '../../../lib/mongo'

class MongoAccountRepository {
  constructor () {
    this.collection = 'account'
    this.mongoDB = new MongoLib()
  }

  async add (account) {
    const id = await this.mongoDB.create(this.collection, account)
    return { id, ...account }
  }

  async delete (id) {
    const idx = await this.mongoDB.delete(this.collection, id)
    return { idx }
  }

  async get (id) {
    const account = await this.mongoDB.get(this.collection, id)
    return { account }
  }

  async getAll () {
    const accounts = await this.mongoDB.getAll(this.collection)
    return { accounts }
  }

  async update ( id, data ) {
    return this.mongoDB.update(this.collection, id, data)
  }
}

export default MongoAccountRepository
