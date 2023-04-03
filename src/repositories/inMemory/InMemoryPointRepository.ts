import { Point, PointProps } from '../../entities/Point'
import { IPointRepository } from '../IPointRepository'

export class InMemoryPointRepository implements IPointRepository {
  private points: Point[] = []
  async createEntry(point: Point): Promise<PointProps> {
    this.points.push(point)

    return Point.toResponse({ data: point })
  }
  async createExit(point: Point): Promise<PointProps> {
    this.points.push(point)

    return Point.toResponse({ data: point })
  }
  async findById(id: number): Promise<PointProps | null> {
    const point = this.points.find((point) => point.id === id)

    return point
      ? point
      : Point.toResponse({
          data: { id: 0, user_id: 0, entry: new Date(Date.now()) },
        })
  }
  async findByUserId(user_id: number): Promise<PointProps[]> {
    this.points.push(
      new Point({
        id: 1,
        user_id: user_id,
        entry: new Date('2021-08-01T00:00:00.000Z'),
        exit: new Date('2021-08-01T00:00:00.000Z'),
      })
    )
    return this.points.map((point) => Point.toResponse({ data: point }))
  }
}
