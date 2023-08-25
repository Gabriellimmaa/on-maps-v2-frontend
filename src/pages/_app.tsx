import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NoSSR from 'react-no-ssr'
import { MapInfoProvider } from '@/context/_useMapInfo.context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/clients'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createCustomTheme } from '@/theme'
import { DefaultLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { ToastProvider } from '@/hooks/useToast.hook'
import { useRouter } from 'next/router'
import { UserProvider } from '@/context/user.context'
import { ModalFeedback } from '@/components/Feedback'

export default function App({ Component, pageProps }: AppProps) {
  const [openFeedback, setOpenFeedback] = useState<boolean>(false)
  const noThemeMui = ['']
  const noLayoutComponent = ['Home', 'Login', 'Custom404', 'Map']

  const checkComponentName = Component.displayName
    ? Component.displayName
    : Component.name

  useEffect(() => {
    const checkUserFeedback = localStorage.getItem('userFeedback')

    if (checkUserFeedback) {
      return
    }

    const tempoExibicaoModal = 120000 // 2 minutos
    // const tempoExibicaoModal = 5000 // 5 segundos

    const timeoutId = setTimeout(() => {
      setOpenFeedback(true)
    }, tempoExibicaoModal)

    // Limpe o timeout ao desmontar o componente
    return () => clearTimeout(timeoutId)
  }, [])

  if (noThemeMui.includes(checkComponentName)) {
    console.log('noThemeMui' + checkComponentName)
    return defaultProvider({
      children: <Component {...pageProps} />,
      layout: React.Fragment,
      theme: false,
      openFeedback,
      setOpenFeedback,
    })
  }

  if (noLayoutComponent.includes(checkComponentName)) {
    console.log('noLayoutComponent' + checkComponentName)
    return defaultProvider({
      children: <Component {...pageProps} />,
      layout: React.Fragment,
      theme: true,
      openFeedback,
      setOpenFeedback,
    })
  }
  console.log('com layout' + checkComponentName)
  return defaultProvider({
    children: <Component {...pageProps} />,
    layout: DefaultLayout,
    theme: true,
    openFeedback,
    setOpenFeedback,
  })
}

function defaultProvider({
  children,
  layout,
  theme = true,
  openFeedback,
  setOpenFeedback,
}: {
  children: React.ReactNode
  layout: any
  theme: boolean
  openFeedback?: boolean
  setOpenFeedback?: any
}) {
  return (
    <NoSSR>
      <QueryClientProvider client={queryClient}>
        <MapInfoProvider>
          <UserProvider>
            {theme ? (
              <ThemeProvider theme={createCustomTheme()}>
                <CssBaseline />
                <ToastProvider>
                  <ModalFeedback
                    open={openFeedback ? openFeedback : false}
                    handleClose={() => setOpenFeedback(false)}
                  />
                  {React.createElement(layout, {}, children)}
                </ToastProvider>
              </ThemeProvider>
            ) : (
              <ToastProvider>
                {React.createElement(layout, {}, children)}
              </ToastProvider>
            )}
          </UserProvider>
        </MapInfoProvider>
      </QueryClientProvider>
    </NoSSR>
  )
}
