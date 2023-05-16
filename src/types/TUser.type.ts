import { TRole } from '@/types'

export type TUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: TRole[]
  createdAt: string
  updatedAt: string
}
