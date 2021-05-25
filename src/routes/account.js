import express from 'express'
import { createAccount, deleteAccount, getOneAccount, getAccounts, updateAccount, depositMoney, withdrawalMoney } from '../components/account/controller'

const router = express.Router()

router.post('/', createAccount)
router.delete('/:id', deleteAccount)
router.put('/:id', updateAccount)
router.get('/:id', getOneAccount)
router.get('/', getAccounts)

// Deposits and withdrawals
router.post('/deposit/:id', depositMoney)
router.post('/withdrawal/:id', withdrawalMoney)

export default router