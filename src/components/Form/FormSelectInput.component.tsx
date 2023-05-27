import {
  FormControl,
  FormHelperText,
  Grid,
  GridTypeMap,
  InputLabel,
  InputLabelProps,
  MenuItem,
  Select,
  SelectProps,
  FormControlProps,
} from '@mui/material'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TSelectOption } from '@/types'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'

type Props = {
  id: string
  label: string
  values: {
    value: any
    label: string
  }[]
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  selectProps?: Omit<SelectProps, 'label' | 'error'>
  formControlProps?: FormControlProps
  inputLabelProps?: Omit<InputLabelProps, 'error'>
  defaultValue?: string
}

export const FormSelectInput = (props: Props) => {
  useFormComponents()

  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const {
    id,
    label,
    values,
    gridProps,
    selectProps,
    inputLabelProps,
    formControlProps,
    defaultValue = '',
  } = props

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl
        sx={{ minWidth: 120, height: '80px', width: '100%' }}
        {...formControlProps}
      >
        <InputLabel
          {...inputLabelProps}
          error={!!_get(errors, `${id}.message`)}
        >
          {label}
        </InputLabel>
        <Controller
          name={id}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              label={label}
              error={!!_get(errors, `${id}.message`)}
              {...field}
              {...selectProps}
            >
              {values.map((value) => (
                <MenuItem key={value.value} value={value.value}>
                  {value.label}
                </MenuItem>
              ))}
            </Select>
          )}
        ></Controller>
        <FormHelperText error>
          {_get(errors, `${id}.message`) as ReactNode}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}
