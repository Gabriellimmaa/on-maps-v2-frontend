import { useState } from 'react'
import { ListItemIcon, MenuItem, Menu } from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Person from '@mui/icons-material/Person'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Logout from '@mui/icons-material/Logout'
import { TMenuOpen } from '@/types'
import { ModalSettings } from './ModalSettings/ModalSettings.component'

export const AccountMenu = ({ anchorEl, handleClose, open }: TMenuOpen) => {
  const handleLogout = () => {
    // logout action
  }

  const [openSettings, setOpenSettings] = useState(false)
  const handleOpenSettings = () => setOpenSettings(true)
  const handleCloseSettings = () => setOpenSettings(false)

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
      <ModalSettings handleClose={handleCloseSettings} open={openSettings} />
    </>
  )
}
