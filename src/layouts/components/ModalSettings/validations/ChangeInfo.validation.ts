import { Yup } from '@/utils/formValidator'
import { onlyNumbers } from '@/utils/helpers'
import { TUserChangeInfo } from '../types'

export const changeInfoValidation = (): Yup.SchemaOf<TUserChangeInfo> => {
  const firstName = Yup.string().required()
  const lastName = Yup.string().required()

  return Yup.object().shape({
    firstName,
    lastName,
  })
}
