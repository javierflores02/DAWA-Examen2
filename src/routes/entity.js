import express from 'express'
import { createEntity, deleteEntity, getOneEntity, getEntities, updateEntity } from '../components/entity/controller'

const router = express.Router()

router.post('/api/entity/', createEntity)
router.delete('/api/entity/:id', deleteEntity)
router.put('/api/entity/:id', updateEntity)
router.get('/api/entity/:id', getOneEntity)
router.get('/api/entity/', getEntities)

export default router
