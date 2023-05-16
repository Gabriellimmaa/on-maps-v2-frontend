import { DialogHeader } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { DataRole } from '@/data'
import { Dialog, Typography, DialogContent } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TUser } from '../types'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TUser | undefined
}

export const ModalEdit = (props: TProps) => {
  const { open, handleClose, data } = props

  const formHandler = useForm<{
    firstName: string
    lastName: string
    email: string
    MANAGE_PLACE: boolean
    MANAGE_USER: boolean
  }>({
    mode: 'all',
  })

  useEffect(() => {
    formHandler.reset({
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      MANAGE_PLACE: data?.role.includes('MANAGE_PLACE'),
      MANAGE_USER: data?.role.includes('MANAGE_USER'),
    })
  }, [data, formHandler])

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
          onSubmit={async (data) => {
            const roles = []
            if (data.MANAGE_PLACE) roles.push(DataRole.MANAGE_PLACE.value)
            if (data.MANAGE_USER) roles.push(DataRole.MANAGE_USER.value)
            const dataToSubmit = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              role: roles,
            }
            console.log(dataToSubmit)
            handleClose()
          }}
        >
          <Form.TextInput
            id="firstName"
            label="Nome"
            gridProps={styles.gridxs12md6}
          />
          <Form.TextInput
            id="lastName"
            label="Sobrenome"
            gridProps={styles.gridxs12md6}
          />
          <Form.TextInput id="email" label="E-mail" disabled />

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
