import {
  FormControl,
  FormHelperText,
  Grid,
  GridTypeMap,
  TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'
import { formatDateYYYYMMDD } from '@/utils/helpers'

type TProps = {
  id: string
  label: string
  defaultValue?: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  disabled?: boolean
}

export const FormDatePickerInput = (props: TProps) => {
  useFormComponents()
  const { id, label, gridProps, defaultValue } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const handleChange = (value: any) => {
    if (!value) return ''
    return formatDateYYYYMMDD(new Date(value), '-')
  }

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl sx={{ minWidth: 120, width: 1, height: '80px' }}>
        <Controller
          name={id}
          control={control}
          defaultValue={
            defaultValue ? defaultValue : formatDateYYYYMMDD(new Date(), '-')
          }
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={label}
                inputFormat="DD/MM/YYYY"
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
