'use-client'
import { Popup, Marker as MarkerMap } from 'react-leaflet'
import { TMapCategories, TPlace } from '@/types'
import { Icon } from 'leaflet'
import { DataMapCategories } from '@/data'
import styles from './styles/Marker.module.css'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { useRef } from 'react'

type TProps = {
  latitude: number
  longitude: number
  category: TMapCategories
  zoomIcon: number
  anchorIcon: number
  popAnchor: number
  customIcon?: any
  place: any
}

export default function Marker({
  latitude,
  longitude,
  category,
  zoomIcon,
  anchorIcon,
  popAnchor,
  customIcon,
  place,
}: TProps) {
  const iconByCategory = DataMapCategories.find(
    (item) => item.value === category
  )?.markerIcon

  const icon = new Icon({
    iconUrl: iconByCategory?.src,
    iconSize: [zoomIcon, zoomIcon],
    iconAnchor: [anchorIcon, zoomIcon],
    popupAnchor: [0, popAnchor],
  })

  return (
    <MarkerMap
      position={[latitude, longitude]}
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
          {/* {place.image.map((image, index) => (
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
          ))} */}
        </Swiper>
        <div>
          <h4>{place.name}</h4>
          <div className={styles.grid}>
            <span>Categoria: {place.category}</span>
            <span>Piso: {place.floor}</span>
            {place.responsible && (
              <span>Responsável: {place.responsible.name}</span>
            )}
            <span>
              {place.responsible?.phone
                ? `(${place.responsible.phone})`
                : place.responsible?.email && `(${place.responsible?.email})`}
            </span>
          </div>
        </div>
        <Link href={`/place/${place.id}`} className={styles.button}>
          Ver mais
        </Link>
      </Popup>
    </MarkerMap>
  )
}
