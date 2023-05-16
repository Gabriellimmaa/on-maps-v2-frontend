import { DialogHeader } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { DataRole } from '@/data'
import { Dialog, Typography, DialogContent } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TPlace } from '@/types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import React from 'react'
import ImageSwiper from './ImageSwiper.component'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace | undefined
}

export const ModalImage = (props: TProps) => {
  const { open, handleClose, data } = props

  if (!data) return null

  return (
    <Dialog onClose={handleClose} aria-labelledby="config-dialog" open={open}>
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Visualizar Imagens
        </Typography>
      </DialogHeader>
      <DialogContent
        dividers
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography component="span" variant="body1" fontWeight={'bold'}>
          Clique e arrate para o lado
        </Typography>
        <ImageSwiper />
      </DialogContent>
    </Dialog>
  )
}
