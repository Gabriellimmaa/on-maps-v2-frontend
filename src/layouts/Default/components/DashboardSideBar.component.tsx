import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Zoom,
  SxProps,
} from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuMap } from './MenuMap.component'
import { grey } from '@mui/material/colors'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import HomeIcon from '@mui/icons-material/Home'
import MapIcon from '@mui/icons-material/Map'
import InfoIcon from '@mui/icons-material/Info'
import EventIcon from '@mui/icons-material/Event'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import EditLocationIcon from '@mui/icons-material/EditLocation'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useUser } from '@/context/user.context'
import { TPermissions } from '@/types'
import CelebrationIcon from '@mui/icons-material/Celebration'
import EditNotificationsIcon from '@mui/icons-material/EditNotifications'

type TData = {
  title: string
  icon: JSX.Element
  path?: string
  route?: boolean
  style?: SxProps
}[]

const drawerWidth = 64

export const DashboardSideBar = () => {
  const { user } = useUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const currentRoute = router.asPath

  const data: any = [
    {
      title: 'Início',
      icon: <HomeIcon />,
      path: '/',
      route: true,
      style: styles.borderBottom,
    },
    {
      title: 'Mapa',
      icon: <MapIcon />,
      route: false,
      style: styles.borderBottom,
    },
    {
      title: 'Buscar ambientes',
      icon: <TravelExploreIcon />,
      path: '/place/list',
      route: true,
      style: styles.borderBottom,
    },
    {
      title: 'Eventos',
      icon: <EventIcon />,
      path: '/event/list',
      route: true,
      style: styles.borderBottom,
    },
    {
      title: 'Dashboard',
      icon: <AdminPanelSettingsIcon />,
      path: '/dashboard',
      route: true,
      permission: 'MANAGE_PLACE',
      style: styles.borderBottom,
    },
    {
      title: 'Criar Evento',
      icon: <EditNotificationsIcon />,
      path: '/dashboard/create/event',
      route: true,
      permission: 'MANAGE_PLACE',
      style: styles.borderBottom,
    },
    {
      title: 'Gerenciar Evento',
      icon: <CelebrationIcon />,
      path: '/dashboard/manage/event',
      route: true,
      permission: 'MANAGE_PLACE',
      style: styles.borderBottom,
    },
    {
      title: 'Criar Ambiente',
      icon: <AddLocationAltIcon />,
      path: '/dashboard/create/place',
      route: true,
      permission: 'MANAGE_PLACE',
      style: styles.borderBottom,
    },
    {
      title: 'Gerenciar Ambiente',
      icon: <EditLocationIcon />,
      path: '/dashboard/manage/place',
      route: true,
      permission: 'MANAGE_PLACE',
      style: styles.borderBottom,
    },
    {
      title: 'Criar Usuário',
      icon: <PersonAddIcon />,
      path: '/dashboard/create/user',
      route: true,
      permission: 'MANAGE_USER',
      style: styles.borderBottom,
    },
    {
      title: 'Gerenciar Usuário',
      icon: <ManageAccountsIcon />,
      path: '/dashboard/manage/user',
      route: true,
      permission: 'MANAGE_USER',
      style: styles.borderBottom,
    },
    {
      title: 'Sobre',
      icon: <InfoIcon />,
      path: '/about',
      route: true,
      style: {
        position: 'absolute',
        bottom: 0,
        borderTop: `1px solid ${grey[300]}`,
      },
    },
  ]

  console.log(currentRoute)

  return (
    <>
      <Drawer variant="permanent" sx={styles.drawer}>
        <Toolbar />
        <Box sx={styles.boxList}>
          <List sx={styles.list}>
            {data.map((item: any, index: any) => {
              if (
                !item.permission ||
                user?.permissions.includes(item.permission as TPermissions)
              ) {
                return (
                  <ListItem
                    disablePadding
                    key={index}
                    sx={item.style ? item.style : {}}
                  >
                    <Tooltip
                      title={item.title}
                      placement="right-start"
                      TransitionComponent={Zoom}
                    >
                      {item.route ? (
                        <Link
                          href={`${item.path}`}
                          style={{
                            width: '100%',
                          }}
                        >
                          <ListItemButton
                            selected={
                              currentRoute === `${item.path}` && !anchorEl
                                ? true
                                : false
                            }
                          >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                          </ListItemButton>
                        </Link>
                      ) : (
                        <ListItemButton
                          onClick={(event) => setAnchorEl(event.currentTarget)}
                          selected={anchorEl ? true : false}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                        </ListItemButton>
                      )}
                    </Tooltip>
                  </ListItem>
                )
              }
            })}
          </List>
        </Box>
      </Drawer>
      <MenuMap
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
      />
    </>
  )
}

const styles = {
  drawer: {
    height: 1,
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      backgroundColor: 'background.default',
      boxSizing: 'border-box',
    },
  },
  boxList: {
    height: 1,
    overflow: 'auto',
    '& .MuiListItemButton-root': {
      display: 'grid',
      justifyContent: 'center',
      py: 2,
    },
    '& .MuiListItemIcon-root': {
      justifyContent: 'center',
      display: 'grid',
    },
  },
  list: {
    height: 1,
  },
  borderBottom: {
    borderBottom: `1px solid ${grey[300]}`,
  },
}
