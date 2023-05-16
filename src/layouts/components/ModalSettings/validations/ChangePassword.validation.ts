import { Yup } from '@/utils/formValidator'
import { passwordSchemeValidation } from '@/utils/validations'
import { TChangePassword } from '../types'

export const changePasswordValidation = (): Yup.SchemaOf<TChangePassword> => {
  const password = passwordSchemeValidation
  const confirmPassword = Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não são iguais')
    .required()

  return Yup.object().shape({ password, confirmPassword })
}
