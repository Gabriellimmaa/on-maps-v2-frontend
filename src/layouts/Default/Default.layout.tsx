import { DashboardSideBar } from './components'
import { Navigation } from '../components'

type TProps = {
  children: React.ReactNode
}

export function DefaultLayout({ children }: TProps) {
  return (
    <Navigation iconColor="white" sideBar={<DashboardSideBar />}>
      {children}
    </Navigation>
  )
}
