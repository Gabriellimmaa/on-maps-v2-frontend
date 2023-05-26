import { DialogHeader } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { DataRole } from '@/data'
import {
  Dialog,
  Typography,
  DialogContent,
  CircularProgress,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TPostCreateUserBody, TUser } from '@/types'
import { queryClient } from '@/clients'
import { useMutation } from '@tanstack/react-query'
import { putUser } from '@/api'
import { useToast } from '@/hooks/useToast.hook'
import { removeMatchingAttributes } from '@/utils/helpers'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TUser | undefined
}

export const ModalEdit = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()

  const formHandler = useForm<{
    username: string
    email: string
    MANAGE_PLACE: boolean
    MANAGE_USER: boolean
  }>({
    mode: 'all',
    defaultValues: {
      username: data?.username,
      email: data?.email,
      MANAGE_PLACE: data?.permissions.includes('MANAGE_PLACE'),
      MANAGE_USER: data?.permissions.includes('MANAGE_USER'),
    },
  })

  useEffect(() => {
    formHandler.reset({
      username: data?.username,
      email: data?.email,
      MANAGE_PLACE: data?.permissions.includes('MANAGE_PLACE'),
      MANAGE_USER: data?.permissions.includes('MANAGE_USER'),
    })
  }, [data, formHandler])

  const { mutateAsync, isLoading } = useMutation(
    ({ id, body }: { id: string; body: Partial<TPostCreateUserBody> }) =>
      putUser(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        queryClient.invalidateQueries(['user', data?.id])
        createToast('Usuário editado com sucesso!', 'success')
        handleClose()
      },
      onError: (error: any) => {
        formHandler.reset()
        createToast(error.response.data.message, 'error')
      },
    }
  )

  if (!data) return null

  return (
    <Dialog onClose={handleClose} aria-labelledby="config-dialog" open={open}>
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Usuário
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Form
          id="edit-user"
          handler={formHandler}
          onSubmit={async (dataForm) => {
            try {
              const dataToSubmit: Partial<TPostCreateUserBody> = {
                username: dataForm.username,
                email: dataForm.email,
              }
              const permissions: any = []
              if (dataForm.MANAGE_PLACE)
                permissions.push(DataRole.MANAGE_PLACE.value)
              if (dataForm.MANAGE_USER)
                permissions.push(DataRole.MANAGE_USER.value)
              if (permissions.length != 0)
                dataToSubmit.permissions = permissions

              removeMatchingAttributes(dataToSubmit, data)

              await mutateAsync({ id: data.id.toString(), body: dataToSubmit })
              handleClose()
            } catch {}
          }}
        >
          <Form.TextInput id="username" label="Nome" />
          <Form.TextInput id="email" label="E-mail" />

          <Form.SwitchInput
            id="MANAGE_PLACE"
            label="Gerenciar Locais"
            gridProps={styles.gridxs12md6}
            tooltipProps={{
              title: DataRole.MANAGE_PLACE.description,
              placement: 'right',
            }}
          />

          <Form.SwitchInput
            id="MANAGE_USER"
            label="Gerenciar Usuários"
            gridProps={styles.gridxs12md6}
            tooltipProps={{
              title: DataRole.MANAGE_USER.description,
              placement: 'right',
            }}
          />
          <Form.SubmitBtn
            form="edit-user"
            gridProps={{
              xs: 12,
            }}
            btnProps={{
              sx: {
                width: 1,
              },
              startIcon: isLoading ? (
                <CircularProgress sx={{ color: 'white' }} size={20} />
              ) : null,
              disabled: isLoading,
            }}
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
  gridxs12md6: {
    xs: 12,
    md: 6,
  },
}
