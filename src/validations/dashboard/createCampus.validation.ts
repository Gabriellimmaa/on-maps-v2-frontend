import { TPostCreateCampusBody } from '@/types'
import { Yup } from '@/utils/formValidator'
import { SchemaOf } from 'yup'

export const createCampusValidation = (): SchemaOf<TPostCreateCampusBody> => {
  return Yup.object().shape({
    name: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    position: Yup.array()
      .of(
        Yup.object().shape({
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
        })
      )
      .required(),
    universityId: Yup.number().required(),
  })
}
