import { describe, expect, it } from 'vitest'
import { User, UserProps } from '../../entities/User'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { LoginUserUseCase } from './LoginUserUseCase'

describe('loginUser', () => {
  it('should be able to login a new', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const loginUserUseCase = new LoginUserUseCase(inMemoryUserRepository)
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    const user = {
      name: 'John Doe',
      code: '123456',
      is_admin: false,
    }

    await createUserUseCase.execute(user)

    await expect(loginUserUseCase.execute(user.code)).resolves.toContain(user)
  })
})
