import { TPlace } from '@/types'

export type TGetCampusResponse = {
  id: string
  name: string
  city: string
  state: string
  phone: string
  email: string
  universityId: number
  createdAt: string
  updatedAt: string
  place: TPlace[]
}[]
