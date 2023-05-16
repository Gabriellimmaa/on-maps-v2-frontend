import { TPlace, TPostCreatePlaceBody } from '@/types'
import { Yup } from '@/utils/formValidator'
import { formatCurrencyToString, onlyNumbers } from '@/utils/helpers'

export const createUserValidation = (): Yup.ObjectSchema<any> => {
  return Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required(),
    manageUsers: Yup.boolean().required(),
    managePlaces: Yup.boolean().required(),
  })
}
