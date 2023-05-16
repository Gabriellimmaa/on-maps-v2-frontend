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

  const { mutate: mutateEquipment } = useMutation(
    (data: string) => deleteEquipment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['equipment'])
      },
    }
  )

  const { mutate: mutateCategory } = useMutation(
    (data: string) => deleteCategory(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category'])
      },
    }
  )

  const { mutate: mutateUniversity } = useMutation(
    (data: string) => deleteUniversity(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['university'])
      },
    }
  )

  const { mutate: mutateCampus } = useMutation(
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

  const handleDelete = () => {
    try {
      if (type === 'campus') {
        mutateCampus(data.id.toString())
        createToast(`Campus deletado com sucesso!`, 'success')
        return
      }
      if (type === 'university') {
        mutateUniversity(data.id.toString())
        createToast(`Universidade deletada com sucesso!`, 'success')
        return
      }
      if (type === 'category') {
        mutateCategory(data.id.toString())
        createToast(`Categoria deletada com sucesso!`, 'success')
        return
      }
      if (type === 'equipment') {
        mutateEquipment(data.id.toString())
        createToast(`Equipamento deletado com sucesso!`, 'success')
        return
      }
    } catch (e) {
      createToast(e as string, 'error')
    }
    handleClose()
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
