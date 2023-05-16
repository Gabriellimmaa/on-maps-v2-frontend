import { DialogHeader } from '@/components/Dialog'
import { Button, Dialog, Typography, DialogContent, Box } from '@mui/material'
import ImageSwiper from './ImageSwiper.component'
import { TPlace } from '@/types'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace | undefined
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
          Deletar {data.name}
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Tem certeza que deseja deletar o {data.category}, {`"${data.name}"`}?
        </Typography>
        <Typography variant="body1" paragraph>
          Essa ação não pode ser desfeita.
        </Typography>

        <Box>
          <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
            Nome: {data.name} <br />
            Categoria: {data.category} <br />
            Bloco: {data.building}
          </Typography>
          <Typography variant="h4" marginTop={5}>
            Ver {data.name}
          </Typography>
          <ImageSwiper />
        </Box>

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
