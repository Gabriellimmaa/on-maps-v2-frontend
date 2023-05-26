import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { patchFeedback } from '@/api'
import { SentimentalRating } from './SentimentalRating.component'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast.hook'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalFeedback = (props: TProps) => {
  const { open, handleClose } = props
  const { createToast } = useToast()
  const [value, setValue] = useState<number | null>(null)

  const { mutate } = useMutation((value: number) => patchFeedback(value))

  useEffect(() => {
    if (value) {
      mutate(value)
      localStorage.setItem('userFeedback', 'true')
      handleClose()
      createToast('Obrigado pelo seu feedback!', 'success', 3000)
    }
  }, [value])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'} mr={5}>
          Dê-nos sua opinião sobre o OnMaps!
        </Typography>
      </DialogHeader>
      <DialogContent
        dividers
        sx={{
          ...flexCenterContent,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" gutterBottom>
          Ajude-nos a melhorar ainda mais, compartilhando sua avaliação sobre a
          usabilidade do projeto. É rápido e simples!
        </Typography>

        <SentimentalRating
          value={value}
          setValue={setValue}
          boxProps={{
            sx: {
              my: 2,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
