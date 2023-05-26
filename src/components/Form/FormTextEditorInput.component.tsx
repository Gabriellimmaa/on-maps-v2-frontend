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
} from '@mui/material'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TSelectOption } from '@/types'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'
import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

type Props = {
  id: string
  label: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  textEditorProps?: ReactQuillProps
  defaultValue?: string
}

export const FormTextEditorInput = (props: Props) => {
  useFormComponents()

  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const { id, label, gridProps, textEditorProps, defaultValue = '' } = props

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <FormControl sx={{ minWidth: 120, height: 'auto', width: '100%', mb: 4 }}>
        <Controller
          name={id}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <QuillNoSSRWrapper
              placeholder={label}
              style={{
                width: '100%',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: errors[id] ? 'red' : 'transparent',
                borderRadius: '4px',
              }}
              {...field}
              {...textEditorProps}
            />
          )}
        ></Controller>
        <FormHelperText
          error
          sx={{
            position: 'absolute',
            bottom: '-25px',
          }}
        >
          {_get(errors, `${id}.message`) as ReactNode}
        </FormHelperText>
      </FormControl>
    </Grid>
  )
}
