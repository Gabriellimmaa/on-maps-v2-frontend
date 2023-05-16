import { TPostCreateEquipmentBody } from '@/types'
import { Yup } from '@/utils/formValidator'

export const createEquipmentValidation =
  (): Yup.SchemaOf<TPostCreateEquipmentBody> => {
    return Yup.object().shape({
      name: Yup.string().required(),
    })
  }
