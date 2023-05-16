import { TPostCreateCategoryBody } from '@/types'
import { Yup } from '@/utils/formValidator'

export const createCategoryValidation =
  (): Yup.SchemaOf<TPostCreateCategoryBody> => {
    return Yup.object().shape({
      name: Yup.string().required(),
    })
  }
