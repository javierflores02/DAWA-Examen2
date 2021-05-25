import express from 'express'
import { createEntity, deleteEntity, getOneEntity, getEntities, updateEntity } from '../components/entity/controller'
import { createAccount, deleteAccount, getOneAccount, getAccounts, updateAccount } from '../components/account/controller'

const router = express.Router()

router.post('/api/entity/', createEntity)
router.delete('/api/entity/:id', deleteEntity)
router.put('/api/entity/:id', updateEntity)
router.get('/api/entity/:id', getOneEntity)
router.get('/api/entity/', getEntities)

router.post('/api/account/', createAccount)
router.delete('/api/account/:id', deleteAccount)
router.put('/api/account/:id', updateAccount)
router.get('/api/account/:id', getOneAccount)
router.get('/api/account/', getAccounts)

export default router
