import { PrismaClient } from '@prisma/client'
import { Point, PointProps } from '../entities/Point'
import { IPointRepository } from './IPointRepository'

export class PointRepository implements IPointRepository {
  prisma = new PrismaClient()
  async createEntry(point: Point): Promise<PointProps> {
    const pointCreated = await this.prisma.points.create({
      data: {
        user_id: point.user_id,
        entry: point.entry,
        exit: point.exit,
      },
    })

    return Point.toResponse({ data: pointCreated })
  }
  async createExit(point: PointProps): Promise<PointProps> {
    const pointCreated = await this.prisma.points.update({
      where: {
        id: point.id,
      },
      data: {
        exit: point.exit,
      },
    })

    return Point.toResponse({ data: pointCreated })
  }

  async findById(id: number): Promise<PointProps> {
    const point = await this.prisma.points.findFirstOrThrow({
      where: {
        id: id,
      },
    })

    return Point.toResponse({ data: point })
  }

  async findByUserId(id_user: number): Promise<PointProps[]> {
    const points = await this.prisma.points.findMany({
      where: {
        user_id: id_user,
      },
    })

    return points.map((point) => Point.toResponse({ data: point }))
  }
}
