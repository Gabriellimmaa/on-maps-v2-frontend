import { TPostLoginUserBody } from '@/types'
import { Yup } from '@/utils/formValidator'
import { SchemaOf } from 'yup'

export const loginValidation = (): SchemaOf<TPostLoginUserBody> => {
  return Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  })
}
