import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  async create(user: User): Promise<UserProps> {
    this.users.push(user)
    return User.toResponse({ data: user })
  }

  async findByCode(code: string): Promise<User | null> {
    const user = this.users.find((user) => user.code === code)

    return user || null
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    return user || null
  }

  async listAll(): Promise<UserProps[]> {
    return this.users.map((user) => User.toResponse({ data: user }))
  }
}
