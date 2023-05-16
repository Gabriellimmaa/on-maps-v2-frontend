import { DataCampus } from '@/data'
import { MenuItem, Menu } from '@mui/material'
import Link from 'next/link'

type TProps = {
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: () => void
}

export const MenuMap = ({ anchorEl, open, handleClose }: TProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {DataCampus.map((campus, index) => (
        <MenuItem key={index}>
          <Link href={`/map/${campus.lat}/${campus.lng}`}>{campus.title}</Link>
        </MenuItem>
      ))}
    </Menu>
  )
}
