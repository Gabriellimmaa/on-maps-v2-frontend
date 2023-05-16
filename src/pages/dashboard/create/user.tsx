import { Form } from '@/components/Form'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { createUser } from '../../../validations/dashboard/create/validations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/hooks/useToast.hook'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type TFormProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
  manageUsers: boolean
  managePlaces: boolean
}

type TDataToSubmit = {
  name: string
  email: string
  password: string
  role: string[]
}

export default function User() {
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

  const formHandler = useForm<TFormProps>({
    mode: 'all',
    resolver: yupResolver(createUser()),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      manageUsers: false,
      managePlaces: false,
    },
  })

  const submitForm = async (data: TFormProps) => {
    const dataToSubmit: TDataToSubmit = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: [],
    }

    if (data.manageUsers) {
      dataToSubmit.role.push('MANAGE_USER')
    }
    if (data.managePlaces) {
      dataToSubmit.role.push('MANAGE_PLACE')
    }

    if (dataToSubmit.role.length === 0) {
      createToast('Selecione pelo menos uma permissão', 'error')
      return
    }

    console.log(dataToSubmit)
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
        <Form.TextInput id="name" label="Nome" gridProps={styles.name} />
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
          id="managePlaces"
          label="Gerenciar Ambientes"
          gridProps={styles.managePlaces}
        />
        <Form.SwitchInput
          id="manageUsers"
          label="Gerenciar Usuários"
          gridProps={styles.manageUsers}
        />
        <Form.SubmitBtn
          form="create-user"
          btnProps={{ sx: { width: 1, height: '54px', mt: 2 } }}
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
