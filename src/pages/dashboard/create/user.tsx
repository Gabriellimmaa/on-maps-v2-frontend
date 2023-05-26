import { Form } from '@/components/Form'
import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/hooks/useToast.hook'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { createUserValidation } from '@/validations/dashboard/manage/user'
import { TPostCreateUserBody } from '@/types'
import { postUserCreate } from '@/api'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { queryClient } from '@/clients'

type TFormProps = {
  username: string
  email: string
  password: string
  confirmPassword: string
  manageUser: boolean
  managePlace: boolean
}

export default function User() {
  const router = useRouter()
  const { createToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { mutateAsync: mutateUser, isLoading } = useMutation(
    (data: TPostCreateUserBody) => postUserCreate(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        router.push('/dashboard/manage/user')
        createToast('Usuário criado com sucesso', 'success')
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const formHandler = useForm<TFormProps>({
    mode: 'all',
    resolver: yupResolver(createUserValidation()),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      manageUser: false,
      managePlace: false,
    },
  })

  const submitForm = async (data: TFormProps) => {
    const dataToSubmit: TPostCreateUserBody = {
      username: data.username,
      email: data.email,
      password: data.password,
      permissions: [],
    }

    if (data.manageUser) {
      dataToSubmit.permissions.push('MANAGE_USER')
    }
    if (data.managePlace) {
      dataToSubmit.permissions.push('MANAGE_PLACE')
    }

    if (dataToSubmit.permissions.length === 0) {
      createToast('Selecione pelo menos uma permissão', 'error')
      return
    }
    try {
      await mutateUser(dataToSubmit)
    } catch {}
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Criar Usário
      </Typography>
      <Form
        id="create-user"
        handler={formHandler}
        onSubmit={(data) => submitForm(data)}
      >
        <Form.TextInput id="username" label="Nome" gridProps={styles.name} />
        <Form.TextInput id="email" label="Email" gridProps={styles.email} />
        <Form.TextInput
          id="password"
          label="Senha"
          gridProps={styles.password}
          textFieldProps={{
            type: showPassword ? 'text' : 'password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Form.TextInput
          id="confirmPassword"
          label="Confirmar Senha"
          gridProps={styles.confirmPassword}
          textFieldProps={{
            type: showConfirmPassword ? 'text' : 'password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Grid xs={12} item>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Permissões
          </Typography>
        </Grid>
        <Form.SwitchInput
          id="managePlace"
          label="Gerenciar Ambientes"
          gridProps={styles.managePlaces}
        />
        <Form.SwitchInput
          id="manageUser"
          label="Gerenciar Usuários"
          gridProps={styles.manageUsers}
        />
        <Form.SubmitBtn
          form="create-user"
          btnProps={{
            sx: { width: 1, height: '54px', mt: 2 },
            startIcon: isLoading ? (
              <CircularProgress sx={{ color: 'white' }} size={20} />
            ) : null,
            disabled: isLoading,
          }}
          gridProps={{ xs: 12 }}
          handler={formHandler}
        >
          Criar Usuário
        </Form.SubmitBtn>
      </Form>
    </>
  )
}

const styles = {
  name: { xs: 6 },
  email: { xs: 6 },
  password: { xs: 6 },
  confirmPassword: { xs: 6 },
  manageUsers: { xs: 6 },
  managePlaces: { xs: 6 },
}
