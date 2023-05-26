import { TPostCreatePlaceBody } from '@/types'
import { Yup } from '@/utils/formValidator'

export const createPlaceValidation = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    floor: Yup.string()
      .transform((value, originalValue) => {
        return originalValue === '' ? '0' : value
      })
      .default('0'),
    description: Yup.string().required(),
    category: Yup.string().required(),
    position: Yup.array()
      .of(
        Yup.object().shape({
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
        })
      )
      .required(),
    file1: Yup.mixed()
      .test('fileExists', 'Arquivo é obrigatório', (value) => {
        if (!value || value === '') return false
        return true
      })
      .test('fileSize', 'Arquivo deve ter no máximo 25mb', (value) => {
        if (!value) return true
        return value && value.size <= 25000000
      }),
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
    equipment: Yup.array().of(Yup.string()).default([]),
    open24h: Yup.boolean().required(),
    date: Yup.mixed().when('open24h', {
      is: true,
      then: Yup.mixed().nullable().default(null),
      otherwise: Yup.object().shape({
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
