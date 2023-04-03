import { User, UserProps } from '../entities/User'

export interface IUserRepository {
  create(user: User): Promise<UserProps>
  findByCode(code: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  listAll(): Promise<UserProps[]>
}
