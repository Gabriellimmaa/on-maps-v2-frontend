import { TRole } from '@/types'

export type TPutUser = {
  firstName: string
  lastName: string
  password?: string
  role: TRole[]
}
