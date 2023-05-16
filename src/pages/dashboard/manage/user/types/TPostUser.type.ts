import { TRole } from '@/types'

export type TPostUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: TRole[]
}
