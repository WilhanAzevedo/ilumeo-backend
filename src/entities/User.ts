export interface UserProps {
  id?: number
  name: string
  code: string
  is_admin: boolean
}

export class User {
  private props: UserProps

  constructor(props: UserProps) {
    this.props = props
  }

  get id(): number {
    return this.props.id ?? 0
  }

  get name(): string {
    return this.props.name
  }

  get code(): string {
    return this.props.code
  }

  get is_admin(): boolean {
    return this.props.is_admin
  }

  static toResponse({ data }: { data: UserProps | any }): UserProps {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      is_admin: data.is_admin,
    }
  }
}
