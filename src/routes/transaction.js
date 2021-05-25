import express from 'express'
import { getOneTransaction } from '../components/transaction/controller'

const router = express.Router()

router.get('/:id', getOneTransaction)

export default router
