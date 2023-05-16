import { TPlace } from './TPlace.type'
import { TUniversity } from './TUniversity.type'

export type TCampus = {
  id: number
  name: string
  city: string
  state: string
  phone: string
  email: string
  university: TUniversity
  universityId: number
  place: TPlace[]
  createdAt: string
  updatedAt: string
}
