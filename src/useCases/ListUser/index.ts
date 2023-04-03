import { ListUserUseCase } from './ListUserUseCase'
import { ListUserController } from './ListUserController'
import { UserRepository } from '../../repositories/UserRepository'

const userRepository = new UserRepository()

const listUserUseCase = new ListUserUseCase(userRepository)

const listUserController = new ListUserController(listUserUseCase)

export { listUserUseCase, listUserController }
