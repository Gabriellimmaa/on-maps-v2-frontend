import { TMapCategories, TEquipaments } from '@/types'

export type TPostCreatePlaceBody = {
  name: string
  description: string
  category: TMapCategories
  position: {
    latitude: number
    longitude: number
  }[]
  files: {
    path: string
    filename: string
  }[]
  floor: number
  building: string
  campusId: number
  accessibility: boolean
  capacity?: number
  equipment: TEquipaments[]
  date?: {
    start: string
    end: string
  }
  open24h?: boolean
  event: number[]
  responsible?: {
    name?: string
    email?: string
    phone: string
  }
}
