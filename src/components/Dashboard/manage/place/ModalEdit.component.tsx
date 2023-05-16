import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent, Box } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TPlace } from '@/types'
import EditPlace from '../edit'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace | undefined
}

export const ModalEdit = (props: TProps) => {
  const { open, handleClose, data } = props

  if (!data) return null

  // const formHandler = useForm<{
  //   name: string
  //   category: string
  //   description: string
  //   floor: string
  //   building: string
  //   campus: string
  //   capacity: number | null
  //   equipments: string[]
  //   accessibility: boolean
  //   open24h: boolean
  //   area: boolean
  //   position: any
  // }>({
  //   mode: 'all',
  // })

  // useEffect(() => {
  //   formHandler.reset({
  //     name: props.data?.name,
  //     category: props.data?.category,
  //     description: props.data?.description,
  //     floor: props.data?.floor,
  //     building: props.data?.building,
  //     campus: props.data?.campus,
  //     capacity: props.data?.capacity,
  //     equipments: props.data?.equipments,
  //     accessibility: props.data?.accessibility,
  //     open24h: props.data?.open24h,
  //     position: props.data?.position,
  //   })
  // }, [
  //   data,
  //   formHandler,
  //   props.data?.accessibility,
  //   props.data?.building,
  //   props.data?.campus,
  //   props.data?.capacity,
  //   props.data?.category,
  //   props.data?.description,
  //   props.data?.equipments,
  //   props.data?.floor,
  //   props.data?.name,
  //   props.data?.open24h,
  //   props.data?.position,
  // ])

  if (!data) return null

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="config-dialog"
      open={open}
      sx={styles.dialog}
    >
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Lugar
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        {/* <EditPlace data={data} open={open} handleClose={handleClose} /> */}
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '80%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}
