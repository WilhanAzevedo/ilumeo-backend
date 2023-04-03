import { CreateEntryRegistryUseCase } from './CreateEntryRegistryUseCase'
import { CreateEntryRegistryController } from './CreateEntryRegistryController'
import { PointRepository } from '../../repositories/PointRepository'
import { UserRepository } from '../../repositories/UserRepository'

const pointRepository = new PointRepository()
const userRepository = new UserRepository()

const createEntryRegistryUseCase = new CreateEntryRegistryUseCase(
  pointRepository,
  userRepository
)

const createEntryRegistryController = new CreateEntryRegistryController(
  createEntryRegistryUseCase
)

export { createEntryRegistryUseCase, createEntryRegistryController }
