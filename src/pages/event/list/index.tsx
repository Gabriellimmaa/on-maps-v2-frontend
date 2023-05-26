import { Divider, Box, Grid, Typography, Link, Button } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createElement, useEffect, useState } from 'react'
import { DataEquipaments, DataMapCategories } from '@/data'
import Carousel from 'react-material-ui-carousel'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import dynamic from 'next/dynamic'
import { getEventFilter, getPlaceById, getPlaceFilter } from '@/api'
import { LoadingSpinner } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { TGetEventFilterQueryParams } from '@/types'
import { CardEvent } from '@/components/Event'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { useDebounce } from '@/hooks'
import { Height, Search } from '@mui/icons-material'
import { chunkList } from '@/utils/helpers'

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

export default function EventList() {
  const router = useRouter()
  const { id } = router.query
  const [params, setParams] = useState<TGetEventFilterQueryParams>({})

  const { data: eventsEmphasis, isLoading: isLoadingEventsEmphasis } = useQuery(
    ['event-emphasis'],
    () =>
      getEventFilter({
        emphasis: true,
      })
  )

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching,
  } = useQuery(['events', params], () => getEventFilter(params))
  const formHandler = useForm<{
    name: string
  }>({
    shouldUnregister: false,
  })

  const watchName = formHandler.watch('name')
  const debouncedSearch = useDebounce(watchName, 500)

  useEffect(() => {
    setParams({
      ...params,
      name: debouncedSearch,
    })
  }, [debouncedSearch])

  if (isLoadingEventsEmphasis) return <LoadingSpinner />

  if (events?.length === 0)
    return (
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={'bold'}>
          Ops!
        </Typography>
        <Typography variant="h4">
          Parece que não encontramos nenhum evento na plataforma no momento.
        </Typography>
        <Typography variant="h4">
          Que tal explorar outras opções disponíveis? 😊
        </Typography>
      </Box>
    )

  return (
    <Box sx={styles.mainContainer}>
      {eventsEmphasis && eventsEmphasis?.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.default',
              position: 'absolute',
              mt: 2,
              py: 1,
              zIndex: 2,
              pl: 4,
              pr: 2,
              borderRadius: '0 4px 4px 0',
            }}
          >
            <Typography variant="h3" fontWeight={'bold'}>
              {eventsEmphasis[eventsEmphasis.length - 1].name}
            </Typography>
            <Typography variant="body2">
              {new Date(
                eventsEmphasis[eventsEmphasis.length - 1].date
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Typography>
          </Box>

          <Carousel
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeIcon />}
            navButtonsAlwaysVisible
            sx={styles.imageContainer}
            autoPlay={true}
            fullHeightHover={false}
            animation="slide"
            duration={800}
          >
            {eventsEmphasis &&
              eventsEmphasis[eventsEmphasis.length - 1].image.map(
                (item, index) => {
                  return (
                    <Image
                      height={300}
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
                }
              )}
          </Carousel>
        </Box>
      )}
      <Form
        id="filter-events"
        handler={formHandler}
        onSubmit={async (data) => {
          console.log(data)
        }}
      >
        <Grid xs={8}>
          <Typography variant="h4" sx={{ alignSelf: 'baseline' }}>
            Todos eventos
          </Typography>
        </Grid>
        <Form.TextInput
          id="name"
          label="Pesquisar evento"
          gridProps={{
            xs: 4,
          }}
          textFieldProps={{
            InputProps: {
              startAdornment: <Search sx={{ mr: 1 }} />,
            },
            sx: {
              height: 50,
            },
          }}
        />
      </Form>

      {isLoadingEvents ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {events &&
            events.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link
                    href={`/event/${item.id}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <CardEvent item={item} />
                  </Link>
                </Grid>
              )
            })}
        </Grid>
      )}
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
    width: '100%',
    height: '350px',
    borderRadius: 4,
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
