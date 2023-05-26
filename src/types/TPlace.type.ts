import { TCampus } from './TCampus.type'
import { TImage } from './TImage.type'
import { TMapCategories } from './TMapCategories.type'

export type TPlace = {
  id: number
  name: string
  description: string
  category: TMapCategories
  position: {
    latitude: number
    longitude: number
  }[]
  image: TImage[]
  floor: number
  building: string
  campus: TCampus
  campusId: number
  accessibility: boolean
  capacity?: number
  equipment: string[]
  date?: {
    start: string
    end: string
  }
  open24h?: boolean
  responsible?: {
    name?: string
    email?: string
    phone: string
  }
  event: {
    name: string
    description: string
    date: Date
  }[]
  createdAt: string
  updatedAt: string
}
