import { DialogHeader } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { DataRole } from '@/data'
import { Dialog, Typography, DialogContent, Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TEvent, TImage, TPlace } from '@/types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import React from 'react'
import ImageSwiper from './ImageSwiper.component'

type TProps = {
  open: boolean
  handleClose: () => void
  images: TImage[] | undefined
}

export const ModalImage = (props: TProps) => {
  const { open, handleClose, images } = props

  if (!images) return null

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="config-dialog"
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Visualizar Imagens
        </Typography>
      </DialogHeader>
      <DialogContent
        dividers
        sx={{
          pt: 0,
        }}
      >
        <ImageSwiper images={images} />
      </DialogContent>
    </Dialog>
  )
}
