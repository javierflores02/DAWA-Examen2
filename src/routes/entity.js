import express from 'express'
import { createEntity, deleteEntity, getOneEntity, getEntities, updateEntity, getAmounts, getGlobalAmount } from '../components/entity/controller'
import { getTransactions, getAllTransactions } from '../components/transaction/controller'

const router = express.Router()

router.get('/allTransactions', getAllTransactions)

router.post('/', createEntity)
router.delete('/:id', deleteEntity)
router.put('/:id', updateEntity)
router.get('/:id', getOneEntity)
router.get('/', getEntities)

router.get('/:id/transactions', getTransactions)

router.get('/:id/amounts', getAmounts)
router.get('/:id/globalAmount', getGlobalAmount)

export default router
