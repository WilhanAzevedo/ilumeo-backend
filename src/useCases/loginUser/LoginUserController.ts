import { Request, Response } from 'express'
import { UserProps } from '../../entities/User'
import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body

    try {
      const user = await this.loginUserUseCase.execute(code)

      return response.status(200).send(user)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
