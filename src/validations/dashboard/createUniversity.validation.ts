import { TPostCreateUniversityBody } from '@/types'
import { Yup } from '@/utils/formValidator'

export const createUniversityValidation =
  (): Yup.SchemaOf<TPostCreateUniversityBody> => {
    return Yup.object().shape({
      name: Yup.string().required(),
      acronym: Yup.string().required(),
      website: Yup.string().url('URL inválido').required(),
    })
  }
