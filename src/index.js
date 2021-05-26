import express from 'express'
import apiEntity from './routes/entity'
import apiAccount from './routes/account'
import apiTransaction from './routes/transaction'
import { config } from './config.js'
import helmet from 'helmet'
import morgan from 'morgan'
import { ApolloServer, gql } from 'apollo-server'
import axios from 'axios'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use('/api/entity/', apiEntity)
app.use('/api/account/', apiAccount)
app.use('/api/transaction/', apiTransaction)

const typeDefs = gql`
  type Entity {
    _id: String
    name: String
    number: String
    type: String
    ruc: String
  }
  type Account {
    _id: String!
    entity: Entity
    balance: Float!
    transactions: [Transaction]
  }
  type Transaction {
    _id: String!
    idAccount: String!
    type: String!
    from: String
    amount: Float!
    date: String
  }
  type Mutation {
    "Transfer money"
    transferMoney(
      idFromAccount: String!
      amount: Float!
      idToAccount: String!
    ): Transaction
  }
  type Query {
    getAmountEntity(id: String!): Float
    getAccounts: [Account]
  }
`

const resolvers = {
  Query: {
    getAmountEntity: async(root, args) => {
      let cantidad = 0
      await axios.get(`http://localhost:3000/api/entity/${args.id}/globalAmount`)
      .then(function async(response) {
        const {data} = response.data
        cantidad = data.globalAmount
      })
      .catch(function (error) {
        cantidad = 0
      })
      return cantidad
    },
    getAccounts: async(root, args) => {
      const accounts = []
      const entities = []
      await axios.get(`http://localhost:3000/api/entity/`)
      .then(await function async(response) {
        let data = response.data.data.entities
        for (let index = 0; index < data.length; index++) {
          let newEntity = data[index]
          entities.push({
            _id: newEntity._id,
            name: newEntity.name,
            number: newEntity.number,
            type: newEntity.type,
            ruc: newEntity.ruc
          })
        }
      })
      await axios.get(`http://localhost:3000/api/entity/allTransactions`)
      .then(await function async(response) {
        const {data} = response.data
        for (let index = 0; index < data.length; index++) {
          let account = data[index]
          let newEntity = entities.find((entity)=>{return entity._id == account.idOwner})
          let newAccount = {
            "_id": account._id,
            "entity": {...newEntity},
            "balance": account.balance,
            "transactions": account.transactions
          }
          accounts.push(newAccount)
        }
      })
      .catch(function (error) {
        cantidad = 0
      })
      return accounts
    }
  },
  Mutation: {
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

app.use((req, res, next) => {
  res.status(404).send('<h1 style="color:red;">La url a que deseas acceder no existe</h1>')
})

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})