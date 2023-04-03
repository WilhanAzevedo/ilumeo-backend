export interface PointProps {
  id?: number
  user_id: number
  entry: Date
  exit?: Date
}

export class Point {
  private props: PointProps

  constructor(props: PointProps) {
    this.props = props
  }

  get id(): number {
    return this.props.id ?? 0
  }

  get user_id(): number {
    return this.props.user_id
  }

  get entry(): Date {
    return this.props.entry
  }

  get exit(): Date | undefined {
    return this.props.exit
  }

  static toResponse({ data }: { data: PointProps | any }): PointProps {
    return {
      id: data.id,
      user_id: data.user_id,
      entry: data.entry,
      exit: data.exit,
    }
  }
}
