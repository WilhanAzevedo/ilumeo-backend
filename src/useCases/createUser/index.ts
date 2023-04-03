import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'
import { UserRepository } from '../../repositories/UserRepository'

const userRepository = new UserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
