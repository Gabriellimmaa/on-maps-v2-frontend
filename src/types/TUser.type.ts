import { TPermissions } from '@/types'

export type TUser = {
  id: number
  username: string
  email: string
  permissions: TPermissions[]
  createdAt: string
  updatedAt: string
}
