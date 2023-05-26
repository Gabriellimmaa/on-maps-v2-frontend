import { Divider, Box, Grid, Typography, Button, Link } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createElement } from 'react'
import { DataEquipaments, DataMapCategories } from '@/data'
import Carousel from 'react-material-ui-carousel'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import dynamic from 'next/dynamic'
import { useMapInfo } from '../../context/_useMapInfo.context'
import { getEventById, getPlaceById, getPlaceFilter } from '@/api'
import { LoadingSpinner } from '@/components'
import { useQuery } from '@tanstack/react-query'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LanguageIcon from '@mui/icons-material/Language'
import { flexAlingCenter } from '@/utils/cssInJsBlocks'
import { phoneRegexMask } from '@/utils/regexMasks'

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

export default function EventId() {
  const router = useRouter()
  const { id } = router.query

  const { zoomIcon, anchorIcon, popAnchor } = useMapInfo()

  const { data, isLoading } = useQuery(
    ['place', id],
    () => getEventById(parseInt(id as string)),
    {
      enabled: !!id,
    }
  )

  if (isLoading) return <LoadingSpinner />
  if (!data)
    return (
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={'bold'}>
          Ops!
        </Typography>
        <Typography variant="h4">
          Parece que o evento que você está procurando não existe 😢
        </Typography>
        <Typography variant="h4">
          Que tal explorar outras opções disponíveis? 😊
        </Typography>
        <Button sx={{ mt: 4 }} LinkComponent={Link} href="/event/list">
          Voltar para navegação
        </Button>
      </Box>
    )

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
          {data.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {new Date(data.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            minute: '2-digit',
            hour: '2-digit',
          })}
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Grid container>
          <Grid xs={8} sx={styles.informationDetail}>
            <Box sx={styles.containerGap}>
              <Box sx={{ ...flexAlingCenter, gap: 1 }}>
                <Typography variant="h5">Local:</Typography>
                <Typography variant="body2">
                  {data.position ? data.position.name : data.place?.name}
                </Typography>
              </Box>
              <Box sx={{ ...flexAlingCenter, gap: 1 }}>
                <Typography variant="h5">Organizado por:</Typography>
                <Typography variant="body2">{data.organizer}</Typography>
              </Box>
            </Box>
            <Box mx={2}>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mt: 'auto',
              }}
            >
              {data.instagram && (
                <Box sx={flexAlingCenter}>
                  <InstagramIcon sx={styles.icon} />
                  {data.instagram}
                </Box>
              )}
              {data.phone && (
                <Box sx={flexAlingCenter}>
                  <LocalPhoneIcon sx={styles.icon} />
                  {phoneRegexMask(data.phone)}
                </Box>
              )}
              {data.website && (
                <Box sx={flexAlingCenter}>
                  <LanguageIcon sx={styles.icon} />
                  <Link href={data.website}>{data.website}</Link>
                </Box>
              )}
            </Box>
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
              {data?.image.map((item, index) => {
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
              <Typography variant="h4" mb={1}>
                Localização
              </Typography>

              <iframe
                src={`https://maps.google.com/maps?q=${
                  data.place?.position
                    ? data.place?.position[0].latitude
                    : data.position?.latitude
                }, ${
                  data.place?.position
                    ? data.place?.position[0].longitude
                    : data.position?.longitude
                }&z=15&output=embed`}
                frameBorder="0"
                width={'100%'}
                height={250}
                allowFullScreen
              />

              <Button
                width={1}
                component={Link}
                href={`https://www.google.com/maps/dir/?api=1&destination=${
                  data.place?.position
                    ? data.place?.position[0].latitude
                    : data.position?.latitude
                },${
                  data.place?.position
                    ? data.place?.position[0].longitude
                    : data.position?.longitude
                }`}
                target="_blank"
              >
                Ver rotas no Google Maps
              </Button>
            </Box>
            <Box></Box>
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
    pr: 4,
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
    borderRadius: 4,
    mb: 2,
  },

  containerGap: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
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
  icon: {
    mr: 1,
    color: 'primary.main',
  },
}
