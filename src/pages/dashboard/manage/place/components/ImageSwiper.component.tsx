import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

export default function ImageSwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      navigation={true}
    >
      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={require('../../../../../assets/UserIcon.png')}
          alt={'Image'}
          width={250}
          height={150}
        />
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={require('../../../../../assets/UenpLogo.png')}
          alt={'Image'}
          width={250}
          height={150}
        />
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={require('../../../../../assets/UenpLogo.png')}
          alt={'Image'}
          width={250}
          height={150}
        />
      </SwiperSlide>
    </Swiper>
  )
}
