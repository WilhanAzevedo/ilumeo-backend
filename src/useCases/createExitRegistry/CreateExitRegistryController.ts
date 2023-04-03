import { Request, Response } from 'express'
import { UserProps } from '../../entities/User'
import { CreateExitRegistryUseCase } from './CreateExitRegistryUseCase'

export class CreateExitRegistryController {
  constructor(private createExitRegistryUseCase: CreateExitRegistryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, user_id, entry, exit } = request.body

    try {
      const registry = await this.createExitRegistryUseCase.execute({
        id,
        user_id,
        entry,
        exit,
      })

      return response.status(201).send(registry)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
