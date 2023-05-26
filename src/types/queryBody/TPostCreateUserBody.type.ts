import { TPermissions } from '@/types'

export type TPostCreateUserBody = {
  username: string
  email: string
  password: string
  permissions: TPermissions[]
}
