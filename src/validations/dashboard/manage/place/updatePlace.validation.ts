import { Yup } from '@/utils/formValidator'

export const updatePlaceValidation = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    floor: Yup.string().default('0'),
    description: Yup.string().required(),
    category: Yup.string().required(),
    file1: Yup.mixed().test(
      'fileSize',
      'Arquivo deve ter no máximo 25mb',
      (value) => {
        if (!value) return true
        return value && value.size <= 25000000
      }
    ),
    file2: Yup.mixed().test(
      'fileSize',
      'Arquivo deve ter no máximo 25mb',
      (value) => {
        if (!value) return true
        return value && value.size <= 25000000
      }
    ),
    file3: Yup.mixed().test(
      'fileSize',
      'Arquivo deve ter no máximo 25mb',
      (value) => {
        if (!value) return true
        return value && value.size <= 25000000
      }
    ),
    building: Yup.string().required(),
    campusId: Yup.number().required(),
    accessibility: Yup.boolean().required(),
    capacity: Yup.string(),
    equipment: Yup.array().of(Yup.string()).nullable().default([]),
    open24h: Yup.boolean().required(),
    date: Yup.object().when('open24h', {
      is: false,
      then: Yup.object().shape({
        start: Yup.string().required(),
        end: Yup.string().required(),
      }),
    }),
    responsible: Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string(),
    }),
  })
}
