import Image from 'next/image'
import {
  Swiper,
  SwiperProps,
  SwiperRef,
  SwiperSlide,
  SwiperSlideProps,
} from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { TImage } from '@/types'
import { Navigation, Pagination } from 'swiper'

type TProps = {
  swiperProps?: SwiperProps
  swiperSlidesProps?: SwiperSlideProps
  images: TImage[]
}

export default function ImageSwiper(props: TProps) {
  const { swiperProps, swiperSlidesProps, images } = props

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      loop={true}
      modules={[Pagination, Navigation]}
      style={{
        height: '100%',
      }}
      {...swiperProps}
    >
      {images.map((image, _index) => (
        <SwiperSlide key={_index} style={styles.slide} {...swiperSlidesProps}>
          <Image
            src={image.url}
            alt={image.name}
            width={200}
            height={200}
            layout="responsive"
            objectFit="contain"
            style={{
              pointerEvents: 'none',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const styles = {
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto !important',
  },
}
