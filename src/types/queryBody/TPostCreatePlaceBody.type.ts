import { TMapCategories } from '@/types'
import { TPostImage } from './TPostImage.type'

export type TPostCreatePlaceBody = {
  name: string
  floor: number
  description: string
  accessibility: boolean
  capacity: number
  open24h: boolean
  building: string
  category: string
  campusId: number
  image: TPostImage[]
  event: number[]
  position: {
    latitude: number
    longitude: number
  }[]
  equipment: string[]
  responsible: {
    name: string
    email: string
    phone: string
  }
  date: {
    start: string
    end: string
  }
}
