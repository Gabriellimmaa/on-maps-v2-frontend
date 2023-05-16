import { TPostCreateCampusBody } from '@/types'
import { Yup } from '@/utils/formValidator'

export const createCampusValidation =
  (): Yup.SchemaOf<TPostCreateCampusBody> => {
    return Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      city: Yup.string().required(),
      phone: Yup.string().required(),
      state: Yup.string().required(),
      universityId: Yup.number().required(),
    })
  }
