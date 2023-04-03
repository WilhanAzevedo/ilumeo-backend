import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'

export class LoginUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(code: string): Promise<UserProps | never> {
    const user = await this.usersRepository.findByCode(code)

    if (!user) {
      throw new Error('User not exists.')
    }

    return user
  }
}
