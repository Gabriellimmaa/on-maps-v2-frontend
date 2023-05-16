import { DialogHeader } from '@/components/Dialog'
import { Button, Dialog, Typography, DialogContent } from '@mui/material'
import { TUser } from '../types'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TUser | undefined
}

export const ModalDelete = (props: TProps) => {
  const { open, handleClose, data } = props
  if (!data) return null

  const handleDelete = () => {
    console.log('deletar' + data.id)
    handleClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="config-dialog" open={open}>
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Deletar Usuário
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Tem certeza que deseja deletar o usuário {data.firstName}{' '}
          {data.lastName}?
        </Typography>
        <Typography variant="body1" paragraph>
          Essa ação não pode ser desfeita.
        </Typography>

        <Button
          onClick={handleDelete}
          sx={{
            width: 1,
            mt: 2,
            backgroundColor: 'error.main',
            '&:hover': {
              backgroundColor: 'error.dark',
            },
          }}
        >
          Deletar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
