import { TRole } from '@/types'

export type TPostPlace = {
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
  url: string
  position: any
  role: TRole[]
}
