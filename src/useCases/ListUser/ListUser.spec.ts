import { describe, expect, it } from 'vitest'
import { User, UserProps } from '../../entities/User'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ListUserUseCase } from './ListUserUseCase'

describe('ListUser', () => {
  it('should be able to list all users', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const listUserUseCase = new ListUserUseCase(inMemoryUserRepository)
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    const listUsers: UserProps[] = []

    const users = [
      {
        name: 'John Doe',
        code: 'AAAA23',
        is_admin: false,
      },
      {
        name: 'Mary Doe',
        code: 'BBBB23',
        is_admin: false,
      },
    ]

    for (const user of users) {
      const userCreated = await createUserUseCase.execute(user)
      listUsers.push(userCreated)
    }

    await expect(listUserUseCase.execute()).resolves.toMatchObject(listUsers)
  })
})
