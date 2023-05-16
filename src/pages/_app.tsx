import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NoSSR from 'react-no-ssr'
import { MapInfoProvider } from '@/context/_useMapInfo.context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/clients'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createCustomTheme } from '@/theme'
import AxiosInterceptor from '@/clients/http/AxiosInterceptor'
import { DefaultLayout, DashboardLayout } from '@/layouts'
import React from 'react'
import { ToastProvider } from '@/hooks/useToast.hook'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const noThemeMui = ['Home']
  const noLayoutComponent = ['Login', 'Custom404', 'Map']
  const defaultLayoutComponent = ['PlaceList', 'PlaceID']

  const router = useRouter()

  if (router.pathname.startsWith('/components')) {
    return null
  }

  if (noThemeMui.includes(Component.name)) {
    return defaultProvider({
      children: <Component {...pageProps} />,
      layout: React.Fragment,
      theme: false,
    })
  }

  if (noLayoutComponent.includes(Component.name)) {
    return defaultProvider({
      children: <Component {...pageProps} />,
      layout: React.Fragment,
      theme: true,
    })
  }

  if (defaultLayoutComponent.includes(Component.name)) {
    return defaultProvider({
      children: <Component {...pageProps} />,
      layout: DefaultLayout,
      theme: true,
    })
  }

  return defaultProvider({
    children: <Component {...pageProps} />,
    layout: DashboardLayout,
    theme: true,
  })
}

function defaultProvider({
  children,
  layout,
  theme = true,
}: {
  children: React.ReactNode
  layout: any
  theme: boolean
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {theme ? (
        <ThemeProvider theme={createCustomTheme()}>
          <CssBaseline />
          <AxiosInterceptor>
            <ToastProvider>
              {React.createElement(layout, {}, children)}
            </ToastProvider>
          </AxiosInterceptor>
        </ThemeProvider>
      ) : (
        <AxiosInterceptor>
          <ToastProvider>
            {React.createElement(layout, {}, children)}
          </ToastProvider>
        </AxiosInterceptor>
      )}
    </QueryClientProvider>
  )
}
