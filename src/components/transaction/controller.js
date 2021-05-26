import MongoTransactionRepository from './infraestructure/MongoTransactionRepository'
import MongoEntityRepository from '../entity/infraestructure/MongoEntityRepository'
import MongoAccountRepository from '../account/infraestructure/MongoAccountRepository'
import CreateTransaction from './application/createTransaction'
import GetOneTransaction from './application/getOneTransaction'
import GetTransactions from './application/getTransactions'
import GetOneEntity from '../entity/application/getOneEntity'
import GetAccounts from '../account/application/getAccounts'

const TransactionRepository = new MongoTransactionRepository()
const EntityRepository = new MongoEntityRepository()
const AccountRepository = new MongoAccountRepository()

export const createTransaction = async (body) => {
  try {
    const query = CreateTransaction({ TransactionRepository })
    await query(body)
    return true
  } catch (e) {
    return false
  }
}

export const getOneTransaction = async (req, res, next) => {
  try {
    const query = GetOneTransaction({ TransactionRepository })
    const transaction = await query(req.params.id)
    res.status(201).json({
      data: transaction
    })
  } catch (e) {
    next(e)
  }
}

export const getTransactions = async (req, res, next) => {
  try {
    let query = GetOneEntity({ EntityRepository })
    const entity = await query(req.params.id)
    query = GetAccounts({ AccountRepository })
    const {accounts} = await query({ idOwner: entity.id })
    for (let index = 0; index < accounts.length; index++) {
      let account = accounts[index]
      query = GetTransactions({ TransactionRepository })
      const {transactions} = await query({ idAccount: `${account._id}` })
      account.transactions = transactions
    }
    entity.accounts = accounts
    res.status(201).json({
      data: entity
    })
  } catch (e) {
    next(e)
  }
}

export const getAllTransactions = async (req, res, next) => {
  try {
    
    let query = GetAccounts({ AccountRepository })
    const {accounts} = await query()
    for (let index = 0; index < accounts.length; index++) {
      let account = accounts[index]
      query = GetTransactions({ TransactionRepository })
      const {transactions} = await query({ idAccount: `${account._id}` })
      account.transactions = transactions
    }
    res.status(201).json({
      data: accounts
    })
  } catch (e) {
    next(e)
  }
}