import { describe, expect, it } from 'vitest'
import { Point, PointProps } from '../../entities/Point'
import { InMemoryPointRepository } from '../../repositories/inMemory/InMemoryPointRepository'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateEntryRegistryUseCase } from '../createEntryRegistry/CreateEntryRegistryUseCase'
import { createUserUseCase } from '../createUser'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ListPointsUseCase } from './ListPointsUseCase'

describe('CreateEntryRegistry', () => {
  it('should be able to lista all points user', async () => {
    const inMemoryPointRepository = new InMemoryPointRepository()
    const inMemoryUserRepository = new InMemoryUserRepository()
    const listPointsUseCase = new ListPointsUseCase(inMemoryPointRepository)
    const createEntryRegistryUseCase = new CreateEntryRegistryUseCase(
      inMemoryPointRepository,
      inMemoryUserRepository
    )
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

    const registry = {
      id: 1,
      user_id: 0,
      entry: new Date('2021-08-01T00:00:00.000Z'),
      exit: new Date('2021-08-01T00:00:00.000Z'),
    }

    await expect(listPointsUseCase.execute(0)).resolves.toMatchObject([
      registry,
    ])
  })
})
