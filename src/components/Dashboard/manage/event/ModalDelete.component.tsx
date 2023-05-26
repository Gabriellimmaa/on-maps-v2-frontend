import { DialogHeader } from '@/components/Dialog'
import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  CircularProgress,
} from '@mui/material'
import { TEvent, TUser } from '@/types'
import { useToast } from '@/hooks/useToast.hook'
import { queryClient } from '@/clients'
import { useMutation } from '@tanstack/react-query'
import { deleteEvent, deleteUser } from '@/api'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TEvent | undefined
}

export const ModalDelete = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()

  const { mutateAsync, isLoading } = useMutation(
    (id: number) => deleteEvent(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['events'])
        createToast('Evento deletado com sucesso!', 'success')
        handleClose()
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const handleDelete = async () => {
    if (!data) return
    try {
      await mutateAsync(data.id)
    } catch {}
  }

  if (!data) return null

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Deletar Evento
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Tem certeza que deseja deletar o evento {data.name}?
        </Typography>
        <Typography variant="body1" paragraph>
          Essa ação não pode ser desfeita.
        </Typography>

        <Button
          onClick={handleDelete}
          startIcon={
            isLoading ? (
              <CircularProgress sx={{ color: 'white' }} size={20} />
            ) : null
          }
          disabled={isLoading}
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
