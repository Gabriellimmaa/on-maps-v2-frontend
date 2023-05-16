import { TPlace, TPostCreatePlaceBody } from '@/types'
import { Yup } from '@/utils/formValidator'
import { formatCurrencyToString, onlyNumbers } from '@/utils/helpers'

export const createPlace = (): Yup.ObjectSchema<any> => {
  return Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    description: Yup.string().required('Campo obrigatório'),
    category: Yup.string().required('Campo obrigatório'),
    position: Yup.array()
      .of(
        Yup.object().shape({
          latitude: Yup.number().required('Campo obrigatório'),
          longitude: Yup.number().required('Campo obrigatório'),
        })
      )
      .required('Campo obrigatório'),
    files: Yup.array().of(
      Yup.object().shape({
        path: Yup.string().required('Campo obrigatório'),
        filename: Yup.string().required('Campo obrigatório'),
      })
    ),
    floor: Yup.number().required('Campo obrigatório'),
    building: Yup.string().required('Campo obrigatório'),
    campusId: Yup.number().required('Campo obrigatório'),
    accessibility: Yup.boolean().required('Campo obrigatório'),
    capacity: Yup.number().notRequired(),
    equipment: Yup.array().of(Yup.string()).notRequired(),
    date: Yup.object().shape({
      start: Yup.string().required('Campo obrigatório'),
      end: Yup.string().required('Campo obrigatório'),
    }),
    open24h: Yup.boolean().required('Campo obrigatório'),
    event: Yup.array().of(Yup.number()).notRequired(),
    responsible: Yup.object()
      .shape({
        name: Yup.string().notRequired(),
        email: Yup.string().email('E-mail inválido').notRequired(),
        phone: Yup.string().required('Campo obrigatório'),
      })
      .notRequired(),
  })
}
// name: Yup.string().required(),
// description: Yup.string().required(),
// category: Yup.string().required(),
// position: Yup.array()
//   .of(
//     Yup.object().shape({
//       latitude: Yup.number().required(),
//       longitude: Yup.number().required(),
//     })
//   )
//   .required(),
// files: Yup.array().of(
//   Yup.object().shape({
//     path: Yup.string().required(),
//     filename: Yup.string().required(),
//   })
// ),
// floor: Yup.number().required(),
// building: Yup.string().required(),
// campus: Yup.string().required(),
// accessibility: Yup.boolean().required(),
// capacity: Yup.string().notRequired(),
// equipments: Yup.array().of(Yup.string()).notRequired(),
// date: Yup.object().shape({
//   start: Yup.string().required(),
//   end: Yup.string().required(),
// }),
// responsible: Yup.object().shape({
//   name: Yup.string(),
//   email: Yup.string().email('E-mail inválido'),
//   phone: Yup.string(),
// }),
