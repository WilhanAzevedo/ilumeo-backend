import { Point, PointProps } from '../entities/Point'

export interface IPointRepository {
  createEntry(point: Point): Promise<PointProps>
  createExit(point: PointProps): Promise<PointProps>
  findById(id: number | undefined): Promise<PointProps | null>
  findByUserId(id_user: number): Promise<PointProps[]>
}
