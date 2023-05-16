import { Yup } from '@/utils/formValidator'

export const createPlace = () => {
  return Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required(),
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

    image: Yup.array().of(
      Yup.object().shape({
        url: Yup.string().required(),
        name: Yup.string().required(),
      })
    ),
    floor: Yup.number().required(),
    building: Yup.string().required(),
    campus: Yup.string().required(),
    accessibility: Yup.boolean().required(),
    capacity: Yup.string().notRequired(),
    equipments: Yup.array().of(Yup.string()).notRequired(),
    date: Yup.object().shape({
      start: Yup.string().required(),
      end: Yup.string().required(),
    }),
    responsible: Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('E-mail inválido'),
      phone: Yup.string(),
    }),
  })
}
