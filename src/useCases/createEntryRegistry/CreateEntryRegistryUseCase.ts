import { Point, PointProps } from '../../entities/Point'
import { IPointRepository } from '../../repositories/IPointRepository'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateEntryRegistryUseCase {
  constructor(
    private pointRepository: IPointRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: PointProps): Promise<PointProps | never> {
    const user = await this.userRepository.findById(data.user_id)

    if (!user) {
      throw new Error('User not found.')
    }

    const point = await this.pointRepository.createEntry(new Point(data))

    return point
  }
}
