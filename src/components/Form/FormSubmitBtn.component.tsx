import {
  Button,
  ButtonProps,
  CircularProgress,
  Grid,
  GridTypeMap,
} from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useFormComponents } from './context/FormComponents.context'

type Props = {
  children: React.ReactNode
  form: string
  gridProps?: Omit<GridTypeMap['props'], 'item' | 'container'>
  btnProps?: ButtonProps
  handler: UseFormReturn<any, any>
}

export const FormSubmitBtn = (props: Props) => {
  useFormComponents()
  const { children, form, gridProps, btnProps, handler } = props
  const {
    formState: { isValidating, isSubmitting },
  } = handler

  const isLoading = isValidating || isSubmitting

  const loading = (
    <>
      <CircularProgress size={20} sx={{ mr: 1.5, color: 'white' }} />
      Enviando...
    </>
  )

  return (
    <Grid sx={{ ...flexCenterContent }} {...gridProps} item>
      <Button
        id={`${form}-submit-btn`}
        type="submit"
        size="large"
        disabled={isSubmitting}
        form={form}
        {...btnProps}
      >
        {isLoading ? loading : children}
      </Button>
    </Grid>
  )
}
