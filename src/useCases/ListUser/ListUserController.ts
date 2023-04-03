import { Request, Response } from 'express'
import { UserProps } from '../../entities/User'
import { ListUserUseCase } from './ListUserUseCase'

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.listUserUseCase.execute()

      return response.status(200).send(users)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
