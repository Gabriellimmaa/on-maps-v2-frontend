import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
  Zoom,
} from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import EditLocationIcon from '@mui/icons-material/EditLocation'
import HomeIcon from '@mui/icons-material/Home'

import Link from 'next/link'
import { useRouter } from 'next/router'
const drawerWidth = 64
const data = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    path: 'dashboard',
  },
  {
    title: 'Criar Lugar',
    icon: <AddLocationAltIcon />,
    path: 'dashboard/create/place',
  },
  {
    title: 'Gerenciar Lugar',
    icon: <EditLocationIcon />,
    path: 'dashboard/manage/place',
  },
  {
    title: 'Criar Usuário',
    icon: <PersonAddIcon />,
    path: 'dashboard/create/user',
  },
  {
    title: 'Gerenciar Usuário',
    icon: <ManageAccountsIcon />,
    path: 'dashboard/manage/user',
  },
]

export const DashboardSideBar = () => {
  const router = useRouter()
  const currentRoute = router.asPath

  return (
    <Drawer variant="permanent" sx={styles.drawer}>
      <Toolbar />
      <Box sx={styles.list}>
        <List>
          {data.map((item, index) => (
            <Box key={index}>
              <ListItem disablePadding>
                <Tooltip
                  title={item.title}
                  placement="right-start"
                  TransitionComponent={Zoom}
                >
                  <Link
                    href={`/${item.path}`}
                    style={{
                      width: '100%',
                    }}
                  >
                    <ListItemButton
                      selected={currentRoute === `/${item.path}` ? true : false}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                    </ListItemButton>
                  </Link>
                </Tooltip>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      backgroundColor: 'background.default',
      boxSizing: 'border-box',
    },
  },
  list: {
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
}
