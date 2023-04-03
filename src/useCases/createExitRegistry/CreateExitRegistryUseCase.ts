import { Point, PointProps } from '../../entities/Point'
import { IPointRepository } from '../../repositories/IPointRepository'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateExitRegistryUseCase {
  constructor(private pointRepository: IPointRepository) {}

  async execute(data: PointProps): Promise<PointProps | never> {
    const point = await this.pointRepository.findById(data.id)

    if (!point) {
      throw new Error('Point not found.')
    }

    const pointRegistred = await this.pointRepository.createExit(data)

    return pointRegistred
  }
}
