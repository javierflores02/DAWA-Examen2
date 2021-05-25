import MongoAccountRepository from './infraestructure/MongoAccountRepository'
import CreateAccount from './application/createAccount'
import DeleteAccount from './application/deleteAccount'
import GetOneAccount from './application/getOneAccount'
import GetAccounts from './application/getAccounts'
import UpdateAccount from './application/updateAccount'

const AccountRepository = new MongoAccountRepository()

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
    const queryG = GetOneAccount({ AccountRepository })
    const amount = parseInt(req.body.amount)
    const {account:accountG} = await queryG(req.params.id)
    const newBalance = accountG.balance + amount
    const queryU = UpdateAccount({ AccountRepository })
    const accountU = await queryU(req.params.id,{"balance":newBalance})
    res.status(201).json({
      data: accountU
    })
  } catch (e) {
    next(e)
  }
}

export const withdrawalMoney = async (req, res, next) => {
  try {
    const queryG = GetOneAccount({ AccountRepository })
    const amount = parseInt(req.body.amount)
    const {account:accountG} = await queryG(req.params.id)
    if(amount < accountG.balance){
      const newBalance = accountG.balance - amount
      const queryU = UpdateAccount({ AccountRepository })
      const accountU = await queryU(req.params.id,{"balance":newBalance})
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