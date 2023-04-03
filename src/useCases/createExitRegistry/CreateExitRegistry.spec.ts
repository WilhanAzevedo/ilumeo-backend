import { describe, expect, it } from 'vitest'
import { InMemoryPointRepository } from '../../repositories/inMemory/InMemoryPointRepository'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateExitRegistryUseCase } from './CreateExitRegistryUseCase'

describe('CreateExitRegistry', () => {
  it('should be able to create a new exit registry', async () => {
    const inMemoryPointRepository = new InMemoryPointRepository()
    const createExitRegistryUseCase = new CreateExitRegistryUseCase(
      inMemoryPointRepository
    )

    let today = new Date(Date.now())

    const exit = {
      id: 0,
      user_id: 0,
      entry: today,
      exit: today,
    }

    expect(createExitRegistryUseCase.execute(exit)).resolves.toContain(exit)
  })
})
