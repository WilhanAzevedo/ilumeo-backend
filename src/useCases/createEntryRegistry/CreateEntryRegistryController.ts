import { Request, Response } from 'express'
import { UserProps } from '../../entities/User'
import { CreateEntryRegistryUseCase } from './CreateEntryRegistryUseCase'

export class CreateEntryRegistryController {
  constructor(private createEntryRegistryUseCase: CreateEntryRegistryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, entry } = request.body

    try {
      const registry = await this.createEntryRegistryUseCase.execute({
        user_id,
        entry,
      })

      return response.status(201).send(registry)
    } catch (Error: any) {
      return response.status(400).json({
        message: Error.message || 'Unexpected error.',
      })
    }
  }
}
