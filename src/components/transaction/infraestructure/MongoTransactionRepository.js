import MongoLib from '../../../lib/mongo'

class MongoTransactionRepository {
  constructor () {
    this.collection = 'transaction'
    this.mongoDB = new MongoLib()
  }

  async add (transaction) {
    const id = await this.mongoDB.create(this.collection, transaction)
    return { id, ...transaction }
  }

  async get (id) {
    const transaction = await this.mongoDB.get(this.collection, id)
    return { transaction }
  }

  async getAll (query) {
    console.log(query)
    const transactions = await this.mongoDB.getAll(this.collection,query)
    return { transactions }
  }
}

export default MongoTransactionRepository
