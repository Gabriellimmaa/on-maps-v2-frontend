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
import HomeIcon from '@mui/icons-material/Home'
import MapIcon from '@mui/icons-material/Map'
import { MenuMap } from './MenuMap.component'
import InfoIcon from '@mui/icons-material/Info'
import { grey } from '@mui/material/colors'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import EventIcon from '@mui/icons-material/Event'

type TData = {
  title: string
  icon: JSX.Element
  path?: string
  route?: boolean
  style?: SxProps
}[]

const drawerWidth = 64

export const DashboardSideBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const currentRoute = router.asPath

  const data: TData = [
    {
      title: 'Início',
      icon: <HomeIcon />,
      path: '/',
      route: true,
      style: {
        borderBottom: `1px solid ${grey[300]}`,
      },
    },
    {
      title: 'Mapa',
      icon: <MapIcon />,
      route: false,
      style: {
        borderBottom: `1px solid ${grey[300]}`,
      },
    },
    {
      title: 'Buscar lugares',
      icon: <TravelExploreIcon />,
      path: '/place/list',
      route: true,
      style: {
        borderBottom: `1px solid ${grey[300]}`,
      },
    },
    {
      title: 'Eventos',
      icon: <EventIcon />,
      path: '/event/list',
      route: true,
      style: {
        borderBottom: `1px solid ${grey[300]}`,
      },
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

  return (
    <>
      <Drawer variant="permanent" sx={styles.drawer}>
        <Toolbar />
        <Box sx={styles.boxList}>
          <List sx={styles.list}>
            {data.map((item, index) => (
              <>
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
                            currentRoute === `${item.path}` ? true : false
                          }
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                        </ListItemButton>
                      </Link>
                    ) : (
                      <ListItemButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                      </ListItemButton>
                    )}
                  </Tooltip>
                </ListItem>
              </>
            ))}
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
}
