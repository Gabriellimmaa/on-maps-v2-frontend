import { TImage } from './TImage.type'
import { TPlace } from './TPlace.type'

export type TEvent = {
  id: number
  name: string
  description: string
  date: string
  website?: string
  phone?: string
  instagram?: string
  organizer: string
  emphasis: boolean
  image: TImage[]
  position?: {
    latitude: number
    longitude: number
    name: string
  }
  place?: TPlace
  placeId?: number
  createdAt: string
  updatedAt: string
}
