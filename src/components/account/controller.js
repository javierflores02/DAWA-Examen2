import MongoAccountRepository from './infraestructure/MongoAccountRepository'
import MongoTransactionRepository from '../transaction/infraestructure/MongoTransactionRepository'
import CreateAccount from './application/createAccount'
import DeleteAccount from './application/deleteAccount'
import GetOneAccount from './application/getOneAccount'
import GetAccounts from './application/getAccounts'
import UpdateAccount from './application/updateAccount'
import createTransaction from '../transaction/application/createTransaction'

const AccountRepository = new MongoAccountRepository()
const TransactionRepository = new MongoTransactionRepository()

export const createAccount = async (req, res, next) => {
  try {
    const query = CreateAccount({ AccountRepository })
    const account = await query(req.body)
    res.status(201).json({
      data: account,
      message: 'Account created successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const updateAccount = async (req, res, next) => {
  try {
    const query = UpdateAccount({ AccountRepository })
    const account = await query(req.params.id,req.body)
    res.status(201).json({
      data: account,
      message: 'Account updated successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const deleteAccount = async (req, res, next) => {
  try {
    const query = DeleteAccount({ AccountRepository })
    const id = await query(req.params.id)
    res.status(201).json({
      data: id,
      message: 'Account removed successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const getOneAccount = async (req, res, next) => {
  try {
    const query = GetOneAccount({ AccountRepository })
    const account = await query(req.params.id)
    res.status(201).json({
      data: account
    })
  } catch (e) {
    next(e)
  }
}

export const getAccounts = async (req, res, next) => {
  try {
    const query = GetAccounts({ AccountRepository })
    const accounts = await query()
    res.status(201).json({
      data: accounts
    })
  } catch (e) {
    next(e)
  }
}

export const depositMoney = async (req, res, next) => {
  try {
    let query = GetOneAccount({ AccountRepository })
    const amount = parseFloat(req.body.amount)
    const {account:accountG} = await query(req.params.id)
    const newBalance = accountG.balance + amount
    query = UpdateAccount({ AccountRepository })
    const accountU = await query(req.params.id,{"balance":newBalance})
    query = createTransaction({ TransactionRepository })
    await query(amount,"deposit",req.params.id)
    res.status(201).json({
      data: accountU
    })
  } catch (e) {
    next(e)
  }
}

export const withdrawalMoney = async (req, res, next) => {
  try {
    let query = GetOneAccount({ AccountRepository })
    const amount = parseFloat(req.body.amount)
    const {account:accountG} = await query(req.params.id)
    if(amount < accountG.balance){
      const newBalance = accountG.balance - amount
      query = UpdateAccount({ AccountRepository })
      const accountU = await query(req.params.id,{"balance":newBalance})
      query = createTransaction({ TransactionRepository })
      await query(amount,"withdrawal",req.params.id)
      res.status(201).json({
        data: accountU
      })
    }else{
      res.status(400).json({
        error: "You don't have enough balance for this withdrawal"
      })
    }
  } catch (e) {
    next(e)
  }
}

export const transferMoney = async (req, res, next) => {
  try {
    let query = GetOneAccount({ AccountRepository })
    const amount = parseFloat(req.body.amount)
    const {account:fromAccount} = await query(req.params.idFromAccount)
    const {account:toAccount} = await query(req.body.idToAccount)
    if(amount < fromAccount.balance){
      const newBalanceFrom = fromAccount.balance - amount
      const newBalanceTo = toAccount.balance + amount
      query = UpdateAccount({ AccountRepository })
      await query(req.params.idFromAccount,{"balance":newBalanceFrom})
      await query(req.body.idToAccount,{"balance":newBalanceTo})
      res.status(201).json({
        response: "The transfer was successful"
      })
    }else{
      res.status(400).json({
        response: "The originating account doesn't have enough balance for the transfer"
      })
    }
  } catch (e) {
    next(e)
  }
}