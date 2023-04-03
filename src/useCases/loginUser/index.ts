import { LoginUserUseCase } from './LoginUserUseCase'
import { LoginUserController } from './LoginUserController'
import { UserRepository } from '../../repositories/UserRepository'

const userRepository = new UserRepository()

const loginUserUseCase = new LoginUserUseCase(userRepository)

const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserUseCase, loginUserController }
