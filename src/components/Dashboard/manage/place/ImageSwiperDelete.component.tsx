import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import React, { useState } from 'react'
import { TPlace } from '@/types'
import { Button, Typography } from '@mui/material'

type TProps = {
  data: TPlace | undefined
}

export function ImageSwiperDelete(props: TProps) {
  const [data, setData] = useState<TPlace>()

  return (
    <Swiper spaceBetween={50} slidesPerView={1} navigation={true}>
      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <Image
          src={require('../../../../../assets/UserIcon.png')}
          alt={'Image'}
          width={250}
          height={150}
        /> */}
        <Button
          onClick={() => {
            setData(props.data)
          }}
          sx={{ cursor: 'pointer' }}
          color="error"
        >
          <Typography variant="subtitle1">Deletar Imagem</Typography>
        </Button>
      </SwiperSlide>

      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <Image
          src={require('../../../../../assets/UenpLogo.png')}
          alt={'Image'}
          width={250}
          height={150}
        /> */}
        <Button
          onClick={() => {
            setData(props.data)
          }}
          sx={{ cursor: 'pointer' }}
          color="error"
        >
          <Typography variant="subtitle1">Deletar Imagem</Typography>
        </Button>
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <Image
          src={require('../../../../../assets/UenpLogo.png')}
          alt={'Image'}
          width={250}
          height={150}
        /> */}
        <Button
          onClick={() => {
            setData(props.data)
          }}
          sx={{ cursor: 'pointer' }}
          color="error"
        >
          <Typography variant="subtitle1">Deletar Imagem</Typography>
        </Button>
      </SwiperSlide>
    </Swiper>
  )
}
