import { TCampus, TPlace } from '@/types'

export type TGetUniversityResponse = {
  id: string
  name: string
  acronym: string
  campuses: TCampus[]
  createdAt: string
  updatedAt: string
}[]
