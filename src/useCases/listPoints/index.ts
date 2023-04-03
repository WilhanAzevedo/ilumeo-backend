import { ListPointsUseCase } from './ListPointsUseCase'
import { ListPointsController } from './ListPointsController'
import { PointRepository } from '../../repositories/PointRepository'

const pointRepository = new PointRepository()

const listPointsUseCase = new ListPointsUseCase(pointRepository)

const listPointsController = new ListPointsController(listPointsUseCase)

export { listPointsUseCase, listPointsController }
