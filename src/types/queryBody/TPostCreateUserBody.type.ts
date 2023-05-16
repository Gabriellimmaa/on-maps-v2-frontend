import { TRole } from '@/types'

export type TPostCreateUserBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: TRole[]
}
