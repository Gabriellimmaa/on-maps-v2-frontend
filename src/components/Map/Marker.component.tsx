'use-client'
import { Popup, Marker as MarkerMap } from 'react-leaflet'
import { TMapCategories, TPlace } from '@/types'
import { Icon } from 'leaflet'
import { DataMapCategories } from '@/data'
import styles from './styles/Marker.module.css'
import iconMarker from '@/assets/Markers/01.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { useRef } from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { alignSpaceBetween } from '@/utils/cssInJsBlocks'

type TProps = {
  zoomIcon: number
  anchorIcon: number
  popAnchor: number
  customIcon?: any
  place: TPlace
}

export default function Marker({
  zoomIcon,
  anchorIcon,
  popAnchor,
  customIcon,
  place,
}: TProps) {
  const iconByCategory = DataMapCategories.find(
    (item) => item.value === place.category
  )?.markerIcon

  const icon = new Icon({
    iconUrl: iconByCategory?.src ? iconByCategory?.src : iconMarker.src,
    iconSize: [zoomIcon, zoomIcon],
    iconAnchor: [anchorIcon, zoomIcon],
    popupAnchor: [0, popAnchor],
  })

  return (
    <MarkerMap
      position={[place.position[0].latitude, place.position[0].longitude]}
      icon={customIcon ? customIcon : icon}
    >
      <Popup closeButton={false} minWidth={240} className={styles.popup}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Navigation, Autoplay]}
          className={styles.swiper}
        >
          {place.image.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.image}>
                <Image
                  src={image.url}
                  alt={image.name}
                  width={240}
                  height={240}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <Typography variant="h4">{place.name}</Typography>
          <Box sx={alignSpaceBetween}>
            <Typography variant="body2">Categoria: {place.category}</Typography>
            <Typography variant="body2">Piso: {place.floor}</Typography>
          </Box>
        </div>
        <Button
          component={Link}
          href={`/place/${place.id}`}
          width={1}
          sx={{
            color: 'white !important',
          }}
        >
          Ver mais
        </Button>
      </Popup>
    </MarkerMap>
  )
}
