import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent, Box } from '@mui/material'
import { TCategory, TPostCreateCategoryBody } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { putCategory } from '@/api'
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

export const ModalUpdateCategory = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateCategoryBody>({
    mode: 'all',
    resolver: yupResolver(createCategoryValidation()),
  })

  const { mutateAsync: mutateCategory } = useMutation(
    ({
      categoryId,
      body,
    }: {
      categoryId: string
      body: TPostCreateCategoryBody
    }) => putCategory(categoryId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category'])
      },
    }
  )

  if (!data) return null

  const handleSubmit = async (dataForm: TPostCreateCategoryBody) => {
    try {
      await mutateCategory({
        categoryId: data.id.toString(),
        body: dataForm,
      })
      formHandler.reset()
      handleClose()
      createToast(`Categoria editada com sucesso!`, 'success')
      return
    } catch (error: any) {
      createToast(error.response.data.message, 'error')
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Categoria
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography component="span" variant="body1">
          Edite os campos abaixo para editar a categoria.
        </Typography>
        <Box />
        <Typography component="span" variant="body2">
          <b>Nome da categoria:</b> {data.name}
        </Typography>

        <Form
          id="update-category"
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
            form="update-category"
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
