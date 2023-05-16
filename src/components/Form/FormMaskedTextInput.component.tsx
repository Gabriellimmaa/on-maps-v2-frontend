import {
  FormControl,
  Grid,
  GridTypeMap,
  TextField,
  TextFieldProps,
} from '@mui/material'
import InputMask from 'react-input-mask'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'

type Props = {
  id: string
  label: string
  mask: string
  defaultValue?: string
  disabled?: boolean
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  textFieldProps?: Omit<
    TextFieldProps,
    'variant' | 'name' | 'label' | 'id' | 'disabled'
  >
}

export const FormMaskedTextInput = (props: Props) => {
  useFormComponents()
  const { id, label, gridProps, mask, textFieldProps, defaultValue, disabled } =
    props
  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl sx={{ minWidth: 120, width: 1, height: '80px' }}>
        <Controller
          name={id}
          control={control}
          defaultValue={defaultValue ? defaultValue : ''}
          render={({ field: { onChange, value } }) => (
            <InputMask
              mask={mask}
              value={value}
              onChange={onChange}
              disabled={disabled}
            >
              <TextField
                helperText={_get(errors, `${id}.message`) as ReactNode}
                error={!!_get(errors, `${id}.message`)}
                label={label}
                fullWidth
                {...textFieldProps}
              />
            </InputMask>
          )}
        ></Controller>
      </FormControl>
    </Grid>
  )
}
