import { TCampus } from './TCampus.type'

export type TUniversity = {
  id: number
  name: string
  acronym: string
  website: string
  campuses: TCampus[]
  createdAt: string
  updatedAt: string
}
