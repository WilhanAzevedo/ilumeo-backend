import { CreateExitRegistryUseCase } from './CreateExitRegistryUseCase'
import { CreateExitRegistryController } from './CreateExitRegistryController'
import { PointRepository } from '../../repositories/PointRepository'

const pointRepository = new PointRepository()

const createExitRegistryUseCase = new CreateExitRegistryUseCase(pointRepository)

const createExitRegistryController = new CreateExitRegistryController(
  createExitRegistryUseCase
)

export { createExitRegistryUseCase, createExitRegistryController }
