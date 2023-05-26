import { TPlace } from './TPlace.type'
import { TUniversity } from './TUniversity.type'

export type TCampus = {
  id: number
  name: string
  city: string
  state: string
  position: {
    latitude: number
    longitude: number
  }[]
  university: TUniversity
  universityId: number
  place: TPlace[]
  createdAt: string
  updatedAt: string
}
