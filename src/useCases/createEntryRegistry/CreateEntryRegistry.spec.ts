import { timeStamp } from 'console'
import { describe, expect, it } from 'vitest'
import { InMemoryPointRepository } from '../../repositories/inMemory/InMemoryPointRepository'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { CreateEntryRegistryUseCase } from './CreateEntryRegistryUseCase'

describe('CreateEntryRegistry', () => {
  it('should be able to create a new entry registry', async () => {
    const inMemoryPointRepository = new InMemoryPointRepository()
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createEntryRegistryUseCase = new CreateEntryRegistryUseCase(
      inMemoryPointRepository,
      inMemoryUserRepository
    )

    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

    const user = {
      name: 'John Doe',
      code: '123456',
      is_admin: false,
    }

    let today = new Date(Date.now())

    const entry = {
      user_id: 0,
      entry: today,
    }

    await createUserUseCase.execute(user)

    expect(createEntryRegistryUseCase.execute(entry)).resolves.toContain(entry)
  })
})
