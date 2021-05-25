import express from 'express'
import { createEntity, deleteEntity, getOneEntity, getEntities, updateEntity } from '../components/entity/controller'
import { getTransactions } from '../components/transaction/controller'

const router = express.Router()

router.post('/', createEntity)
router.delete('/:id', deleteEntity)
router.put('/:id', updateEntity)
router.get('/:id', getOneEntity)
router.get('/', getEntities)

router.get('/:id/transactions', getTransactions)

export default router
