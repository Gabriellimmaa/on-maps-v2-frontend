import {
  FormControl,
  FormHelperText,
  Grid,
  GridTypeMap,
  TextField,
} from '@mui/material'
import { LocalizationProvider, DesktopTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'
import { formatDateYYYYMMDD } from '@/utils/helpers'
import brLocale from 'date-fns/locale/pt-BR'

type TProps = {
  id: string
  label: string
  defaultValue?: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  disabled?: boolean
}

export const FormTimePickerInput = (props: TProps) => {
  useFormComponents()
  const { id, label, gridProps, defaultValue } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const handleChange = (value: any) => {
    if (!value) return ''
    const date = new Date(value).toISOString()
    return date
  }

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl sx={{ minWidth: 120, width: 1, height: '80px' }}>
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={brLocale}
            >
              <DesktopTimePicker
                label={label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!_get(errors, `${id}.message`)}
                  />
                )}
                onChange={(newValue) => {
                  field.onChange(handleChange(newValue))
                }}
                value={field.value}
                disabled={!!props.disabled}
              />
            </LocalizationProvider>
          )}
        ></Controller>
        <FormHelperText error>
          {_get(errors, `${id}.message`) as ReactNode}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}
