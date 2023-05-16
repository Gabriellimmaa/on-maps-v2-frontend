import {
  Divider,
  Box,
  CardMedia,
  Grid,
  Typography,
  Button,
} from '@mui/material'
import Image from 'next/image'
import { Category } from '@/components'
import { TPlace } from '@/types'
import { Router } from 'next/router'
import { useRouter } from 'next/router'
import { createElement, useEffect } from 'react'
import { DataEquipaments, DataMapCategories } from '@/data'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import Carousel from 'react-material-ui-carousel'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import dynamic from 'next/dynamic'
import { useMapInfo } from '../../context/_useMapInfo.context'
import Link from 'next/link'
import { getPlaceById, getPlaceFilter } from '@/api'
import { LoadingSpinner } from '@/components'
import { useQuery } from '@tanstack/react-query'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

const MarkerComponent = dynamic(
  () => import('@/components/Map/Marker.component'),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
)

export default function PlaceList() {
  const router = useRouter()
  const { id } = router.query

  const { zoomIcon, anchorIcon, popAnchor } = useMapInfo()

  const { data: place, isLoading: isLoadingPlace } = useQuery(
    ['place', id],
    () => getPlaceById(id as string),
    {
      enabled: !!id,
    }
  )

  if (isLoadingPlace) return <LoadingSpinner />
  if (!place)
    return (
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={'bold'}>
          Ops!
        </Typography>
        <Typography variant="h4">
          Parece que o ambiente que você está procurando não foi encontrado.
        </Typography>
        <Typography variant="h4">
          Que tal explorar outras opções disponíveis? 😊
        </Typography>
        <Button sx={{ mt: 4 }} LinkComponent={Link} href="/place/list">
          Voltar para navegação
        </Button>
      </Box>
    )

  const iconCategory = DataMapCategories.find(
    (item) => item.value === place.category
  )?.icon

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.subContainer}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {iconCategory && <>{createElement(iconCategory)}</>}
          {place.name}
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Grid container>
          <Grid xs={8} sx={styles.informationDetail}>
            <Box sx={styles.containerGap}>
              <Typography variant="h5">Campus: {place.campus.name}</Typography>
              <Typography variant="h5">Bloco: {place.building}</Typography>
              <Typography variant="h5">Piso: {place.floor} </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ m: 0 }}>
                Descrição
              </Typography>
              <Typography variant="body2">{place.description}</Typography>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ m: 0 }}>
                Horário de funcionamento
              </Typography>
              <Typography variant="body2">
                Dás 8h às 18h, de segunda à sexta
              </Typography>
            </Box>

            {place.equipment.length !== 0 && (
              <Box>
                <Typography variant="h4">Equipamentos</Typography>
                <Box sx={styles.tagContainer}>
                  {DataEquipaments.filter((item) =>
                    place.equipment.includes(item.value)
                  ).map((item, _index) => {
                    return (
                      <>
                        <Box key={item.value} sx={styles.tag}>
                          {createElement(item.icon, {
                            sx: {
                              fontSize: 18,
                            },
                          })}
                          {item.title}
                        </Box>
                      </>
                    )
                  })}
                </Box>
              </Box>
            )}

            {place.responsible && (
              <Box>
                <Typography variant="h4">Responsável pelo local</Typography>

                <Typography
                  variant="body2"
                  sx={{
                    display: !!place.responsible.name ? 'block' : 'none',
                  }}
                >
                  Nome: {place.responsible.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: !!place.responsible.email ? 'block' : 'none',
                  }}
                >
                  Email: {place.responsible.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: !!place.responsible.phone ? 'block' : 'none',
                  }}
                >
                  Telefone: {place.responsible.phone}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography variant="h4">Mais informações</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  my: 1,
                  mb: 4,
                }}
              >
                <Typography variant="body2" textTransform={'capitalize'}>
                  Categoria: {place.category}
                </Typography>
                <Typography variant="body2">
                  Acessibilidade: {place.accessibility ? 'Sim' : 'Não'}
                </Typography>
                {place.capacity && (
                  <Typography variant="body2">
                    Capacidade: {place.capacity}
                  </Typography>
                )}
                {place.open24h && (
                  <Typography variant="body2">
                    Aberto 24h: {place.open24h ? 'Sim' : 'Não'}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Carousel
              NextIcon={<NavigateNextIcon />}
              PrevIcon={<NavigateBeforeIcon />}
              navButtonsAlwaysVisible
              sx={styles.imageContainer}
            >
              {/* @todo - renderizar imagens do place */}
              {/* {place?.image.map((item, index) => {
                return (
                  <Image
                    height={350}
                    key={index}
                    src={item.url}
                    alt={item.name}
                    width={400}
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )
              })} */}
            </Carousel>
            <Box>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235203.81500692177!2d-43.58841988251077!3d-22.9111720903467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio+de+Janeiro%2C+RJ!5e0!3m2!1spt-BR!2sbr!4v1476880758681"
                frameBorder="0"
                width={'100%'}
                height={50}
                allowFullScreen
              /> */}
            </Box>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h4">Localização</Typography>
            <MapComponent
              center={[place.position[0].latitude, place.position[0].longitude]}
              mapStyle={{
                minHeight: '350px',
              }}
            >
              <MarkerComponent
                latitude={place.position[0].latitude}
                longitude={place.position[0].longitude}
                place={place}
                category={place.category}
                zoomIcon={zoomIcon}
                anchorIcon={anchorIcon}
                popAnchor={popAnchor}
              />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${place.position[0].latitude},${place.position[0].longitude}`}
              >
                <Button
                  sx={{
                    width: 1,
                    whiteSpace: 'nowrap',
                    position: 'absolute',
                    zIndex: 999,
                    bottom: 0,
                  }}
                >
                  Ver rota no Google Maps
                </Button>
              </Link>
            </MapComponent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    mt: -2,
  },
  subContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: 1,
    width: 1,
    p: 4,
  },
  subDetailContainer: {
    gap: 4,
  },
  informationDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  tagContainer: {
    display: 'flex',
    mt: 2,
    gap: 2,
  },
  imageContainer: {
    // display: 'flex',
    // justifyContent: 'center',
    width: '100%',
    height: '400px',
  },

  containerGap: {
    display: 'flex',
    gap: 4,
  },
  uselessContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'secondary.main',
    gap: 1,
    fontSize: 12,
    boxShadow: 1,
    px: 1,
    py: 0.3,
    borderRadius: 2,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  },
}
