import {
  TPlace,
  TPostCreateEventBody,
  TPostCreatePlaceBody,
  TPostCreateUserBody,
} from '@/types'
import { Yup } from '@/utils/formValidator'
import { formatCurrencyToString, onlyNumbers } from '@/utils/helpers'
import { SchemaOf } from 'yup'

export const creatEventValidation = (): SchemaOf<
  Omit<TPostCreateEventBody, 'image' | 'position'> & {
    optionPlace: boolean
    position?: {
      name: string
    }
  }
> => {
  return Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string()
      .test('has-content', 'Descrição é obrigatória', (value) => {
        if (value) {
          // Remove todas as tags HTML da string usando regex
          const cleanedValue = value.replace(/<[^>]+>/g, '')
          // Verifica se há algum conteúdo na descrição após remover as tags HTML
          return !!cleanedValue.trim()
        }
        return false
      })
      .required('Descrição é obrigatória'),
    date: Yup.string().required('Data é obrigatório'),
    website: Yup.string().url('URL inválida'),
    phone: Yup.string(),
    instagram: Yup.string(),
    organizer: Yup.string().required('Organizador é obrigatório'),
    emphasis: Yup.boolean().required('Destaque é obrigatório'),
    optionPlace: Yup.boolean().required('Opção de local é obrigatório'),
    position: Yup.mixed().when('optionPlace', {
      is: false,
      then: Yup.object().shape({
        name: Yup.string().required('Nome do local é obrigatório'),
      }),
    }),
    placeId: Yup.number().when('optionPlace', {
      is: true,
      then: Yup.number().required('Local é obrigatório'),
    }),
  })
}
