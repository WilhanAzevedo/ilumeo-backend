import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'

export class ListUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(): Promise<UserProps[] | never> {
    const users = await this.usersRepository.listAll()

    return users
  }
}
