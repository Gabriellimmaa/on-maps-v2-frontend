import { Box, DialogTitle, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface DialogTitleProps {
  id?: string
  children?: React.ReactNode
  onClose?: () => void
}

export const DialogHeader = (props: DialogTitleProps) => {
  const { children, onClose } = props

  return (
    <DialogTitle sx={styles.container}>
      {children}
      <Box sx={styles.box}>
        {onClose ? (
          <Tooltip title="Fechar">
            <IconButton
              onClick={onClose}
              sx={{
                ml: 2,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Box>
    </DialogTitle>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: { display: 'flex', alignItems: 'center' },
}
