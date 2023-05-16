import { TPlace } from './TPlace.type'

export type TCampus = {
  id: number
  name: string
  city: string
  state: string
  phone: string
  email: string
  universityId: number
  place: TPlace[]
  createdAt: string
  updatedAt: string
}
