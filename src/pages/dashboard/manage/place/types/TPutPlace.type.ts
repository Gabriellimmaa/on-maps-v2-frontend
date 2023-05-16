import { TRole } from '@/types'

export type TPutPlace = {
  id: number
  name: string
  category: string
  description: string
  floor: string
  building: string
  campus: string
  capacity: number | null
  equipments: string[]
  accessibility: boolean
  open24h: boolean
  area: boolean
  position: any
  url: string
  role: TRole[]
}
