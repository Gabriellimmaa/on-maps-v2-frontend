import { useEffect, useLayoutEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import styleModule from '@/styles/Home.module.css'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  useTheme,
  Theme,
  CircularProgress,
} from '@mui/material'
import { Form } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { loginValidation } from '@/validations/login'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useMutation } from '@tanstack/react-query'
import { postUserLogin } from '@/api'
import { TPostLoginUserBody } from '@/types'
import api from '@/clients/http/http.client'
import { useToast } from '@/hooks/useToast.hook'
import { AxiosError } from 'axios'
import { useUser } from '@/context/user.context'
import PlaceIcon from '@mui/icons-material/Place'
import { useRouter } from 'next/router'

export default function Login() {
  const theme = useTheme()
  const router = useRouter()
  const styles = makeStyles(theme)
  const items = Array(10).fill(null)
  const { createToast } = useToast()
  const { setUser } = useUser()

  const { mutateAsync: login, isLoading } = useMutation(
    async (data: TPostLoginUserBody) => postUserLogin(data),
    {
      onSuccess: async (data) => {
        const authToken = data.authToken
        const user = data.user

        localStorage.setItem('authToken', authToken)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        createToast('Login realizado com sucesso!', 'success')
        window.location.href = '/dashboard'
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const handleSubmit = async (data: TPostLoginUserBody) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })
    } catch {}
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      router.push('/dashboard')
    }
  }, [])

  const formHandler = useForm<TPostLoginUserBody>({
    mode: 'all',
    resolver: yupResolver(loginValidation()),
  })
  return (
    <Grid container sx={styles.main}>
      <Box sx={styles.goToHome} component={Link} href="/">
        <ArrowBackIosIcon
          sx={{
            color: theme.palette.primary.light,
          }}
        />
        <Typography variant="h6">Voltar</Typography>
      </Box>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', justifyContent: 'center', zIndex: 1600 }}
      >
        <Card sx={styles.card}>
          <CardContent
            sx={{
              pb: '0 !important',
            }}
          >
            <Box px={4}>
              <Typography variant="h4" sx={styles.title}>
                Bem-vindo colaborador 👋
              </Typography>
              <Form
                id="login-form"
                handler={formHandler}
                onSubmit={handleSubmit}
                sx={styles.form}
              >
                <Form.TextInput
                  id="email"
                  label="Email"
                  gridProps={{
                    pl: '0 !important',
                  }}
                />
                <Form.TextInput
                  id="password"
                  label="Senha"
                  gridProps={{
                    pl: '0 !important',
                  }}
                  textFieldProps={{
                    type: 'password',
                  }}
                />
                <Form.SubmitBtn
                  form="login-form"
                  gridProps={{
                    pl: '0 !important',
                    xs: 12,
                  }}
                  btnProps={{
                    sx: styles.button,
                  }}
                  handler={formHandler}
                >
                  Login
                </Form.SubmitBtn>
              </Form>
            </Box>
            <Typography sx={styles.footer}>
              Esqueceu sua senha?{' '}
              <Link
                href="/recoveryPassword"
                style={{ color: theme.palette.primary.light }}
              >
                Clique aqui
              </Link>
            </Typography>
            <Typography sx={{ ...styles.footer, ...styles.recoveryPass }}>
              Venhar ser um colaborador{' '}
              <Link
                href="/about"
                style={{ color: theme.palette.primary.light }}
              >
                ver mais
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {items.map((_, index) => (
        <div
          key={index}
          className={`${styleModule.Cloud} ${styleModule.Foreground}`}
        ></div>
      ))}
    </Grid>
  )
}

const makeStyles = (theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 1,
    height: '100vh',
    background: 'linear-gradient(45deg, #345494, #2f4c8f, #7c8cbc, #345494)',
    animation: '$colors 15s ease infinite',
    '-webkit-animation': '$colors 15s ease infinite',
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'center',
    width: '100%',
  },
  '@keyframes colors': {
    '0%': { background: '#345494' },
    '25%': { background: '#2f4c8f' },
    '50%': { background: '#7c8cbc' },
    '75%': { background: '#2f4c8f' },
    '100%': { background: '#345494' },
  },
  card: {
    padding: 2,
    pb: 0,
    px: 0,
    width: '50%',
    '& .MuiCardContent-root': {
      pb: 0,
      px: 0,
    },
  },
  footer: {
    textAlign: 'center',
    py: 2,
    color: theme.palette.secondary.contrastText,
  },
  recoveryPass: {
    mt: 4,
    backgroundColor: theme.palette.secondary.dark,
  },
  goToHome: {
    color: theme.palette.primary.light,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    top: 20,
    left: 0,
    zIndex: 1500,
    width: 'auto',
    textAlign: 'center',
    padding: '4px 20px',
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
    },
  },
})

Login.displayName = 'Login'
