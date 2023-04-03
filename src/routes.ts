import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { createEntryRegistryController } from './useCases/createEntryRegistry'
import { createExitRegistryController } from './useCases/createExitRegistry'
import { createUserController } from './useCases/createUser'
import { listPointsController } from './useCases/listPoints'
import { listUserController } from './useCases/ListUser'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ message: 'Hello World Teste 2' })
})

router.post('/users', (request, response) => {
  return createUserController.handle(request, response)
})

router.get('/users', (request, response) => {
  return listUserController.handle(request, response)
})

router.post('/entries', (request, response) => {
  return createEntryRegistryController.handle(request, response)
})

router.post('/exits', (request, response) => {
  return createExitRegistryController.handle(request, response)
})

router.post('/points-by-user', (request, response) => {
  return listPointsController.handle(request, response)
})

export { router }
