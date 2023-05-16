import Logo from '../../assets/images/apps/one-pay.png'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DashboardSideBar } from './components'
import { Navigation } from '../components'
// import { useIsFetching, useIsMutating } from '@tanstack/react-query'

type TProps = {
  children: React.ReactNode
}

export function DashboardLayout({ children }: TProps) {
  return (
    <Navigation iconColor="white" sideBar={<DashboardSideBar />}>
      {children}
    </Navigation>
  )
}
