import { DialogHeader } from '@/components/Dialog'
import { Button, Dialog, Typography, DialogContent, Box } from '@mui/material'
import ImageSwiper from './ImageSwiper.component'
import { TPlace } from '@/types'
import { queryClient } from '@/clients'
import { useMutation } from '@tanstack/react-query'
import { deletePlace } from '@/api'
import { useToast } from '@/hooks/useToast.hook'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace | undefined
}

export const ModalDelete = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()

  const { mutateAsync: mutatePlace } = useMutation(
    (id: string) => deletePlace(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['places'])
      },
    }
  )

  if (!data) return null

  const handleDelete = async () => {
    try {
      await mutatePlace(data.id.toString())
      createToast('Ambiente deletado com sucesso', 'success')
      handleClose()
    } catch (error: any) {
      createToast(error.response.data.message, 'error')
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="config-dialog" open={open}>
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Deletar Ambiente
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Tem certeza que deseja deletar o {data.category} {data.name}?
        </Typography>
        <Typography variant="body1" paragraph>
          Essa ação não pode ser desfeita.
        </Typography>

        <Box>
          <Typography>
            <b>Nome:</b> {data.name} <br />
            <b>Categoria:</b> {data.category} <br />
            <b>Bloco:</b> {data.building}
          </Typography>
          <Typography variant="h5" marginTop={5}>
            Imagens
          </Typography>
          <ImageSwiper
            swiperProps={{
              style: {
                height: '200px',
              },
            }}
            images={data.image}
          />
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
