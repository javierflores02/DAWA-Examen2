import express from 'express'
import { createAccount, deleteAccount, getOneAccount, getAccounts, updateAccount, depositMoney, withdrawalMoney, transferMoney } from '../components/account/controller'

const router = express.Router()

router.post('/', createAccount)
router.delete('/:id', deleteAccount)
router.put('/:id', updateAccount)
router.get('/:id', getOneAccount)
router.get('/', getAccounts)

// Deposits and withdrawals
router.post('/deposit/:id', depositMoney)
router.post('/withdrawal/:id', withdrawalMoney)

// Transfers
router.post('/transfer/:idFromAccount', transferMoney)

export default router