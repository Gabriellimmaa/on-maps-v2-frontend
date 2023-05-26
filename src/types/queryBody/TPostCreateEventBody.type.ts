import { TPostImage } from './TPostImage.type'

export type TPostCreateEventBody = {
  name: string
  description: string
  date: string
  website?: string
  phone?: string
  instagram?: string
  organizer: string
  emphasis: boolean
  image: TPostImage[]
  position?: {
    latitude: number
    longitude: number
    name: string
  }
  placeId?: number
}
