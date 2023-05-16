import { Omit } from 'lodash'
import { TUniversity } from '../TUniversity.type'

export type TPostCreateUniversityBody = Omit<
  TUniversity,
  'id' | 'createdAt' | 'updatedAt' | 'campuses'
>
