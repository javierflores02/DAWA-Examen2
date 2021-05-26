import MongoEntityRepository from './infraestructure/MongoEntityRepository'
import MongoAccountRepository from '../account/infraestructure/MongoAccountRepository'
import GetAccounts from '../account/application/getAccounts'
import CreateEntity from './application/createEntity'
import DeleteEntity from './application/deleteEntity'
import GetOneEntity from './application/getOneEntity'
import GetEntities from './application/getEntities'
import UpdateEntity from './application/updateEntity'

const EntityRepository = new MongoEntityRepository()
const AccountRepository = new MongoAccountRepository()

export const createEntity = async (req, res, next) => {
  try {
    const query = CreateEntity({ EntityRepository })
    const entity = await query(req.body)
    res.status(201).json({
      data: entity,
      message: 'Entity created successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const updateEntity = async (req, res, next) => {
  try {
    const query = UpdateEntity({ EntityRepository })
    const entity = await query(req.params.id,req.body)
    res.status(201).json({
      data: entity,
      message: 'Entity updated successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const deleteEntity = async (req, res, next) => {
  try {
    const query = DeleteEntity({ EntityRepository })
    const id = await query(req.params.id)
    res.status(201).json({
      data: id,
      message: 'Entity removed successfully'
    })
  } catch (e) {
    next(e)
  }
}

export const getOneEntity = async (req, res, next) => {
  try {
    const query = GetOneEntity({ EntityRepository })
    const entity = await query(req.params.id)
    res.status(201).json({
      data: entity
    })
  } catch (e) {
    next(e)
  }
}

export const getEntities = async (req, res, next) => {
  try {
    const query = GetEntities({ EntityRepository })
    const entities = await query()
    res.status(201).json({
      data: entities
    })
  } catch (e) {
    next(e)
  }
}

export const getAmounts = async (req, res, next) => {
  try {
    let query = GetOneEntity({ EntityRepository })
    const entity = await query(req.params.id)
    query = GetAccounts({ AccountRepository })
    const {accounts} = await query({ idOwner: entity.id })
    entity.accounts = accounts
    res.status(201).json({
      data: entity
    })
  } catch (e) {
    next(e)
  }
}

export const getGlobalAmount = async (req, res, next) => {
  try {
    let query = GetOneEntity({ EntityRepository })
    const {entity} = await query(req.params.id)
    query = GetAccounts({ AccountRepository })
    const {accounts} = await query({ idOwner: req.params.id })
    console.log(accounts)
    let globalAmount = 0
    for (let index = 0; index < accounts.length; index++) {
      globalAmount += parseFloat(accounts[index].balance)
    }
    res.status(201).json({
      data: {...entity,globalAmount}
    })
  } catch (e) {
    next(e)
  }
}