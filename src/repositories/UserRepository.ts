import { PrismaClient } from '@prisma/client'
import { User, UserProps } from '../entities/User'
import { IUserRepository } from './IUserRepository'

export class UserRepository implements IUserRepository {
  prisma = new PrismaClient()

  async create(user: User): Promise<UserProps> {
    const userCreated = await this.prisma.users.create({
      data: {
        name: user.name,
        code: user.code,
        is_admin: user.is_admin,
      },
    })

    return User.toResponse({ data: userCreated })
  }

  async findByCode(code: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        code,
      },
    })

    if (!user) {
      return null
    }

    return user as unknown as User
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.users.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return user as unknown as User
  }

  async listAll(): Promise<UserProps[]> {
    const users = await this.prisma.users.findMany()

    return users.map((user) => User.toResponse({ data: user }))
  }
}
