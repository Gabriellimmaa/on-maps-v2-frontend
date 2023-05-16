import { Yup } from '@/utils/formValidator'

export const loginValidation = () => {
  return Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  })
}
