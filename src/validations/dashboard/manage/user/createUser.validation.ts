import { TPlace, TPostCreatePlaceBody, TPostCreateUserBody } from '@/types'
import { Yup } from '@/utils/formValidator'
import { formatCurrencyToString, onlyNumbers } from '@/utils/helpers'
import { SchemaOf } from 'yup'

export const createUserValidation = (): SchemaOf<
  Omit<TPostCreateUserBody, 'permissions'> & {
    manageUser: boolean
    managePlace: boolean
    confirmPassword: string
  }
> => {
  return Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required(),
    manageUser: Yup.boolean().required(),
    managePlace: Yup.boolean().required(),
  })
}
