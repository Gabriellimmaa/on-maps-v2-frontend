import { Divider, Box, Grid, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createElement } from 'react'
import { DataMapCategories } from '@/data'
import Carousel from 'react-material-ui-carousel'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { useMapInfo } from '../../context/_useMapInfo.context'
import Link from 'next/link'
import { getPlaceById } from '@/api'
import { LoadingSpinner } from '@/components'
import { useQuery } from '@tanstack/react-query'

export default function PlaceList() {
  const router = useRouter()
  const { id } = router.query

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
              <Typography variant="h4">Bloco: {place.building}</Typography>
              <Typography variant="h4">Piso: {place.floor} </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ m: 0 }}>
                Universidade
              </Typography>
              <Typography variant="body2">
                {place.campus.university.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ m: 0 }}>
                Campus
              </Typography>
              <Typography variant="body2">{place.campus.name}</Typography>
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
              {place.open24h ? (
                <Typography variant="body2">
                  Aberto 24h: {place.open24h ? 'Sim' : 'Não'}
                </Typography>
              ) : (
                <Typography variant="body2">
                  Dás{' '}
                  {place.date
                    ? new Date(place.date.start).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}{' '}
                  às{' '}
                  {place.date
                    ? new Date(place.date?.end).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}{' '}
                </Typography>
              )}
            </Box>
            {place.equipment.length !== 0 && (
              <Box>
                <Typography variant="h4">Equipamentos</Typography>
                <Box sx={styles.tagContainer}>
                  {place.equipment.map((item, index) => {
                    return (
                      <Box key={index} sx={styles.tag}>
                        {item}
                      </Box>
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
            )}{' '}
          </Grid>
          <Grid xs={4}>
            <Carousel
              NextIcon={<NavigateNextIcon />}
              PrevIcon={<NavigateBeforeIcon />}
              navButtonsAlwaysVisible
              autoPlay={false}
              fullHeightHover={false}
              animation="slide"
              duration={800}
              sx={styles.imageContainer}
            >
              {place?.image.map((item, index) => {
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
              })}
            </Carousel>
            <Box>
              <Typography variant="h4" mt={2}>
                Mais informações
              </Typography>
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
              </Box>
            </Box>
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
          <Grid xs={12} sx={{ mt: 2 }}>
            <Typography variant="h4" mb={1}>
              Localização
            </Typography>

            <iframe
              src={`https://maps.google.com/maps?q=${place.position[0].latitude}, ${place.position[0].longitude}&z=15&output=embed`}
              frameBorder="0"
              width={'100%'}
              height={250}
              allowFullScreen
            />

            <Button
              sx={{
                width: 1,
                py: 3,
              }}
              component={Link}
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.position[0].latitude},${place.position[0].longitude}`}
              target="_blank"
            >
              Ver rotas no Google Maps
            </Button>
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
    height: '350px',
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
