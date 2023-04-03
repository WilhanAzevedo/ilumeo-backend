import { Request, Response } from 'express'
import { UserProps } from '../../entities/User'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, code, is_admin } = request.body

    try {
      const user = await this.createUserUseCase.execute({
        name,
        code,
        is_admin,
      })

      return response.status(201).send(user)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
