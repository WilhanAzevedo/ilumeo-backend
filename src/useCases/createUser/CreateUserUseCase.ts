import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: UserProps): Promise<UserProps | never> {
    const userAlreadyExists = await this.usersRepository.findByCode(data.code)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = await this.usersRepository.create(new User(data))

    return user
  }
}
