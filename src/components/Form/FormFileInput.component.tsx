import {
  Button,
  ButtonProps,
  FormHelperText,
  Grid,
  GridTypeMap,
} from '@mui/material'
import { ReactNode, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useFormComponents } from './context/FormComponents.context'
import { get as _get } from 'lodash'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
type Props = {
  id: string
  accept?: string
  placeholder?: string
  helperText?: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  btnProps?: Omit<ButtonProps, 'children' | 'component' | 'id'>
  inputProps?: Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'id' | 'name' | 'accept' | 'type' | 'onChange' | 'style'
  >
}

export const FormFileInput = (props: Props) => {
  useFormComponents()
  const {
    btnProps,
    inputProps,
    gridProps,
    id,
    helperText,
    accept = 'image/*',
    placeholder = 'Carregar Arquivo...',
  } = props
  const [buttonText, setButtonText] = useState<string>(placeholder)

  const {
    control,
    formState: { errors },
  } = useFormContext<any>()

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): File | undefined => {
    const { files } = e.target
    const fileName = files?.[0]?.name
    if (fileName) {
      setButtonText(fileName)
      if (fileName.length > 25) {
        setButtonText(
          `${fileName.substring(0, 9)}...${fileName.substring(
            fileName.length - 7
          )}`
        )
      }
    }
    return files?.[0]
  }

  return (
    <Grid xs={12} {...gridProps} item>
      <Controller
        name={id}
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <>
            <label htmlFor={`${id}-hidden-input`}>
              <Button
                startIcon={<FileUploadOutlined />}
                color="secondary"
                {...btnProps}
                id={id}
                component="span"
              >
                {buttonText}
              </Button>
              {_get(errors, `${id}.message`) ? (
                <FormHelperText error>
                  {_get(errors, `${id}.message`) as ReactNode}
                </FormHelperText>
              ) : (
                <FormHelperText>{helperText}</FormHelperText>
              )}
            </label>
            <input
              {...inputProps}
              id={`${id}-hidden-input`}
              name={id}
              accept={accept}
              type="file"
              onChange={(e) => field.onChange(handleFileChange(e))}
              style={{ display: 'none' }}
            />
          </>
        )}
      ></Controller>
    </Grid>
  )
}
