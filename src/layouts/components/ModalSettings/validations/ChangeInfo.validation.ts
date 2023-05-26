import { Yup } from '@/utils/formValidator'
import { onlyNumbers } from '@/utils/helpers'
import { TUserChangeInfo } from '../types'

export const changeInfoValidation = () => {
  return Yup.object().shape({
    username: Yup.string().required(),
  })
}
