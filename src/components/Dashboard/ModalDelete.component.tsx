import { DialogHeader } from '@/components/Dialog'
import { Button, Dialog, Typography, DialogContent, Box } from '@mui/material'
import { TCampus, TCategory, TUniversity } from '@/types'
import { useMutation } from '@tanstack/react-query'
import {
  deleteCampus,
  deleteCategory,
  deleteEquipment,
  deleteUniversity,
} from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'

type TProps = {
  open: boolean
  handleClose: () => void
  type: 'university' | 'campus' | 'category' | 'equipment' | null
  data: TUniversity | TCampus | TCategory | null
}

enum EType {
  university = 'Universidade',
  campus = 'Campus',
  category = 'Categoria',
  equipment = 'Equipamento',
}

enum ETypeModificator {
  university = 'a universidade',
  campus = 'o campus',
  category = 'a categoria',
  equipment = 'o equipamento',
}

export const ModalDelete = (props: TProps) => {
  const { open, handleClose, data, type } = props
  const { createToast } = useToast()

  const { mutateAsync: mutateEquipment } = useMutation(
    (data: string) => deleteEquipment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['equipment'])
      },
    }
  )

  const { mutateAsync: mutateCategory } = useMutation(
    (data: string) => deleteCategory(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category'])
      },
    }
  )

  const { mutateAsync: mutateUniversity } = useMutation(
    (data: string) => deleteUniversity(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['university'])
      },
    }
  )

  const { mutateAsync: mutateCampus } = useMutation(
    (data: string) => deleteCampus(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campus'])
      },
    }
  )

  if (!data || !type) return null

  const title = EType[type]
  const checkType = ETypeModificator[type]

  const handleDelete = async () => {
    try {
      if (type === 'campus') {
        await mutateCampus(data.id.toString())
        handleClose()
        createToast(`Campus deletado com sucesso!`, 'success')
        return
      }
      if (type === 'university') {
        await mutateUniversity(data.id.toString())
        handleClose()
        createToast(`Universidade deletada com sucesso!`, 'success')
        return
      }
      if (type === 'category') {
        await mutateCategory(data.id.toString())
        handleClose()
        createToast(`Categoria deletada com sucesso!`, 'success')
        return
      }
      if (type === 'equipment') {
        await mutateEquipment(data.id.toString())
        handleClose()
        createToast(`Equipamento deletado com sucesso!`, 'success')
        return
      }
    } catch (error: any) {
      createToast(error.response.data.message, 'error')
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Deletar {title}
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Tem certeza que deseja deletar {checkType} {`"${data.name}"`}?
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
