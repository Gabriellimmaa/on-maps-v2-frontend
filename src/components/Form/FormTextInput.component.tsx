import { Grid, GridTypeMap, TextField, TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get, omit } from 'lodash'

type Props = {
  id: string
  label: string
  type?: 'uppercase' | 'lowercase' | 'capitalize'
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  textFieldProps?: Omit<TextFieldProps, 'variant' | 'name' | 'label' | 'id'>
  disabled?: boolean
}

export const FormTextInput = (props: Props) => {
  useFormComponents()

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<any>()

  const { textFieldProps, gridProps, label, id, type } = props

  return (
    <Grid sx={{ ...flexCenterContent }} xs={12} {...gridProps} item>
      <TextField
        id={id}
        label={label}
        helperText={_get(errors, `${id}.message`) as ReactNode}
        error={!!_get(errors, `${id}.message`)}
        fullWidth
        onChange={(e) => {
          if (type === 'uppercase') {
            e.target.value = e.target.value.toUpperCase()
          }
          if (type === 'lowercase') {
            e.target.value = e.target.value.toLowerCase()
          }
          if (type === 'capitalize') {
            e.target.value = e.target.value
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          }

          register(id).onChange(e)
        }}
        {...omit(register(id), ['onChange'])}
        {...textFieldProps}
        disabled={props.disabled}
      />
    </Grid>
  )
}
