import { describe, expect, it } from 'vitest'
import { User, UserProps } from '../../entities/User'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    const user = {
      name: 'John Doe',
      code: '123456',
      is_admin: false,
    }

    await expect(createUserUseCase.execute(user)).resolves.toContain(user)
  })

  it('should not be able to create a new user with same code from another', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    const user = {
      name: 'John Doe',
      code: '123456',
      is_admin: false,
    }

    await createUserUseCase.execute(user)

    await expect(createUserUseCase.execute(user)).rejects.toThrow(
      new Error('User already exists.')
    )
  })
})
