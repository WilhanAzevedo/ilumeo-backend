import { Point, PointProps } from '../../entities/Point'
import { IPointRepository } from '../../repositories/IPointRepository'

export class ListPointsUseCase {
  constructor(private pointsRepository: IPointRepository) {}

  async execute(user_id: number): Promise<PointProps[] | never> {
    const points = await this.pointsRepository.findByUserId(user_id)

    return points
  }
}
