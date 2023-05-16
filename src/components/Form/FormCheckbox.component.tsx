import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  GridTypeMap,
  InputLabel,
  InputLabelProps,
  Typography,
  CheckboxProps,
} from '@mui/material'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'

type Props = {
  id: string
  label: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
}

export const FormCheckbox = (props: Props) => {
  useFormComponents()

  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const { id, label, gridProps } = props

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl sx={{ minWidth: 120, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            name={id}
            control={control}
            defaultValue={null}
            render={({ field }) => <Checkbox {...props} {...field} />}
          ></Controller>
          <Typography>{label}</Typography>
        </Box>
        <FormHelperText error>
          {_get(errors, `${id}.message`) as ReactNode}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}
