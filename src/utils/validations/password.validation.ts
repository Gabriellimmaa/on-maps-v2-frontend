import { Yup } from '@/utils/formValidator'
import {
  containNumber,
  containLowerCase,
  containUpperCase,
  containSpecialCharacter,
} from '../inputValidators'

export const passwordSchemeValidation = Yup.string()
  .required()
  .test(
    'uppercase',
    'Deve conter no mínimo uma letra maiúscula',
    containUpperCase
  )
  .test(
    'lowercase',
    'Deve conter no mínimo uma letra minúscula',
    containLowerCase
  )
  .test('number', 'Deve conter no mínimo um número', containNumber)
  .test(
    'special-character',
    'Deve conter no mínimo um caractere especial',
    containSpecialCharacter
  )
  .min(6, 'Deve conter no mínimo 6 caracteres')
