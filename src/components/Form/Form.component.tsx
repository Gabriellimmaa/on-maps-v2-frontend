import { Grid, GridTypeMap } from '@mui/material'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { FormComponentsProvider } from './context/FormComponents.context'
import { FormDatePickerInput } from './FormDatePickerInput.component'
import { FormMaskedTextInput } from './FormMaskedTextInput.component'
import { FormSelectInput } from './FormSelectInput.component'
import { FormSubmitBtn } from './FormSubmitBtn.component'
import { FormSwitchInput } from './FormSwitchInput.component'
import { FormTextInput } from './FormTextInput.component'
import { FormFileInput } from './FormFileInput.component'
import { FormCheckbox } from './FormCheckbox.component'
import { FormSelectCheckboxInput } from './FormSelectCheckboxInput.component'
import { FormTimePickerInput } from './FormTimePickerInput.component'
import { FormDateTimePickerInput } from './FormDateTimePickerInput.component'
import { FormTextEditorInput } from './FormTextEditorInput.component'

type Props = Omit<
  GridTypeMap<React.FormHTMLAttributes<HTMLFormElement>>['props'],
  'item' | 'container' | 'component' | 'onSubmit'
> & {
  handler: UseFormReturn<any, any>
  id: string
  onSubmit: (data: any) => Promise<any>
}

export const Form = (props: Props) => {
  const { children, handler, onSubmit, id, ...rest } = props
  const { handleSubmit } = handler

  return (
    <FormProvider {...handler}>
      <Grid
        spacing={1}
        sx={{ ...flexCenterContent }}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
        container
        id={id}
        component="form"
        autoComplete="off"
      >
        <FormComponentsProvider>{children}</FormComponentsProvider>
      </Grid>
    </FormProvider>
  )
}

Form.SubmitBtn = FormSubmitBtn
Form.TextInput = FormTextInput
Form.SelectInput = FormSelectInput
Form.DatePickerInput = FormDatePickerInput
Form.MaskedTextInput = FormMaskedTextInput
Form.SwitchInput = FormSwitchInput
Form.FileInput = FormFileInput
Form.Checkbox = FormCheckbox
Form.SelectCheckboxInput = FormSelectCheckboxInput
Form.TimePicketInput = FormTimePickerInput
Form.DateTimeInput = FormDateTimePickerInput
Form.TextEditorInput = FormTextEditorInput
