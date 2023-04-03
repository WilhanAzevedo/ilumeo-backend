import { Request, Response } from 'express'
import { ListPointsUseCase } from './ListPointsUseCase'

export class ListPointsController {
  constructor(private listPointsUseCase: ListPointsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.body.user_id
    try {
      const registrys = await this.listPointsUseCase.execute(user_id)

      return response.status(200).send(registrys)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
