import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent, Box } from '@mui/material'
import { TCategory, TPostCreateCategoryBody } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { putEquipment } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createCategoryValidation } from '@/validations/dashboard'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TCategory | null
}

export const ModalUpdateEquipment = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateCategoryBody>({
    mode: 'all',
    resolver: yupResolver(createCategoryValidation()),
  })

  const { mutateAsync: mutateEquipment } = useMutation(
    ({ id, body }: { id: string; body: TPostCreateCategoryBody }) =>
      putEquipment(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['equipment'])
      },
    }
  )

  if (!data) return null

  const handleSubmit = async (dataForm: TPostCreateCategoryBody) => {
    try {
      await mutateEquipment({
        id: data.id.toString(),
        body: dataForm,
      })
      formHandler.reset()
      handleClose()
      createToast(`Equipamento editada com sucesso!`, 'success')
      return
    } catch (error: any) {
      createToast(error.response.data.message, 'error')
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Equipamento
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography component="span" variant="body1">
          Edite os campos abaixo para editar o equipamento.
        </Typography>
        <Box />
        <Typography component="span" variant="body2">
          <b>Nome do equipamento:</b> {data.name}
        </Typography>

        <Form
          id="update-equipment"
          handler={formHandler}
          onSubmit={handleSubmit}
        >
          <Form.TextInput
            id="name"
            label="Novo nome"
            gridProps={styles.name}
            textFieldProps={{
              sx: {
                mt: 4,
              },
            }}
          />

          <Form.SubmitBtn
            form="update-equipment"
            btnProps={{ sx: { width: 1, height: '54px', mt: 2 } }}
            gridProps={{ xs: 12 }}
            handler={formHandler}
          >
            Editar
          </Form.SubmitBtn>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  name: {
    xs: 12,
  },
}
