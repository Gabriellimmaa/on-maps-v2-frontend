import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Dialog,
  DialogContent,
  Paper,
  Typography,
  TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DialogHeader } from '@/components/Dialog/DialogHeader.component'
import { Form } from '@/components/Form'
import { alignGridEnd } from '@/utils/cssInJsBlocks'
import { TModalOpen, TPostCreateUserBody } from '@/types'
import { TChangePassword, TUserChangeInfo } from './types'
import { changeInfoValidation, changePasswordValidation } from './validations'
import { useMutation, useQuery } from '@tanstack/react-query'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { queryClient } from '@/clients'
import { getUser, getUserFilter, putUser } from '@/api'
import { useUser } from '@/context/user.context'
import { useToast } from '@/hooks/useToast.hook'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/components'

export const ModalSettings = ({ handleClose, open }: TModalOpen) => {
  const { user } = useUser()
  const { createToast } = useToast()

  const { mutateAsync, isLoading } = useMutation(
    ({ id, body }: { id: string; body: Partial<TPostCreateUserBody> }) =>
      putUser(id, body),
    {
      onSuccess: () => {
        createToast('Configurações editada com sucesso!', 'success')
        queryClient.invalidateQueries(['user', user?.id])
        handleClose()
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const formHandlerUserInfo = useForm<TUserChangeInfo>({
    mode: 'onBlur',
    resolver: yupResolver(changeInfoValidation()),
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  })

  const formHandlerChangePassword = useForm<TChangePassword>({
    mode: 'onBlur',
    resolver: yupResolver(changePasswordValidation()),
  })

  useEffect(() => {
    formHandlerUserInfo.reset()
  }, [])

  if (user === undefined) {
    return <LoadingSpinner />
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="config-dialog"
      open={open}
      sx={{
        '& .MuiDialog-paper': { maxWidth: '90%' },
      }}
    >
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Configurações
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <>
          <Typography variant="h5" gutterBottom>
            Minhas Informações
          </Typography>
          <Typography variant="body1" paragraph>
            Abaixo você pode atualizar todas as informações do seu perfil,
            exceto o seu e-mail, que é usado como chave para sua conta.
          </Typography>
          <Form
            id="config-form"
            handler={formHandlerUserInfo}
            onSubmit={async (data) => {
              await mutateAsync({
                id: user?.id.toString(),
                body: {
                  username: data.username,
                },
              })
            }}
          >
            <Form.TextInput id="username" label="Nome" />

            <Form.TextInput id="email" label="E-mail" disabled />
            <Form.SubmitBtn
              form="config-form"
              gridProps={{
                xs: 12,
              }}
              btnProps={{
                sx: {
                  marginLeft: 'auto',
                },
              }}
              handler={formHandlerUserInfo}
            >
              Atualizar
            </Form.SubmitBtn>
          </Form>
          <Typography variant="h5" gutterBottom>
            Minha Senha
          </Typography>
          <Typography variant="body1" paragraph>
            Abaixo você pode atualizar a sua senha.
          </Typography>
          <Form
            id="config-change-password-form"
            handler={formHandlerChangePassword}
            onSubmit={async (data) => {
              mutateAsync({
                id: user?.id.toString(),
                body: {
                  password: data.password,
                },
              })
            }}
          >
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={1}
              sx={{ width: 1 }}
            >
              <Form.TextInput
                id="password"
                label="Senha"
                textFieldProps={{
                  type: 'password',
                  autoComplete: 'current-password',
                }}
              />
              <Form.TextInput
                id="confirmPassword"
                label="Repita a Senha"
                textFieldProps={{
                  type: 'password',
                  autoComplete: 'current-password',
                }}
              />
            </Box>
            <Form.SubmitBtn
              form="config-change-password-form"
              gridProps={{
                xs: 12,
              }}
              btnProps={{
                sx: {
                  marginLeft: 'auto',
                },
              }}
              handler={formHandlerChangePassword}
            >
              Atualizar
            </Form.SubmitBtn>
          </Form>
        </>
      </DialogContent>
    </Dialog>
  )
}
