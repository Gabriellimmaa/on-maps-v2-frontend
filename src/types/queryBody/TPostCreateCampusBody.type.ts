import { Omit } from 'lodash'
import { TCampus } from '../TCampus.type'

export type TPostCreateCampusBody = Omit<
  TCampus,
  'id' | 'createdAt' | 'updatedAt' | 'place' | 'university'
>
