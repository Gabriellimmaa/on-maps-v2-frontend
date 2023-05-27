import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './styles/MapSideBar.module.css'
import { FaUser } from 'react-icons/fa'
import { DataMapCategories, DataCampus, DataEvents } from '@/data'
import Image from 'next/image'
import ImageHeader from '@/assets/UenpLogo.png'
import { IoClose } from 'react-icons/io5'
import { useMapInfo } from '@/context/_useMapInfo.context'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Link,
  Typography,
  Divider,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getCampusById, getCategory, getEventFilter } from '@/api'
import { LoadingSpinner } from '../Loading'
import { getCampus } from '@/api'
import { getUniversityFilter } from '@/api'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { TCampus } from '@/types'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import { alignSpaceBetween, flexAlingCenter } from '@/utils/cssInJsBlocks'

export function MapSideBar() {
  const {
    position,
    setPosition,
    config,
    setConfig,
    viewMenu,
    setViewMenu,
    universityId,
    campusId,
  } = useMapInfo()

  const router = useRouter()
  const [latitudeUser, setLatitudeUser] = useState('')
  const [longitudeUser, setLongitudeUser] = useState('')
  const [range, setRange] = useState(1)
  const [inputCheck, setCheck] = useState(true)

  const { data: events, isLoading: isLoadingEvents } = useQuery(
    ['events'],
    () => getEventFilter({})
  )

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['universities'],
    () => getUniversityFilter(),
    {
      keepPreviousData: true,
    }
  )

  const { data: campuses, isLoading: isLoadingCampuses } = useQuery(
    ['campuses'],
    () => getCampus(),
    {
      keepPreviousData: true,
    }
  )

  // const { data: campus } = useQuery(['campus'], () => getCampusById(campusId))
  // const { data: campus } = useQuery(['campus'], () => getUniversityFilter(campusId))

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ['categories'],
    () => getCategory(),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        return [
          {
            id: 0,
            name: 'Todos',
            description: 'Todos os eventos',
          },
          ...data,
        ]
      },
    }
  )

  const formHandler = useForm<{
    universityId: string
    campusId: string
  }>({})

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  function showPosition(position: any) {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  function handleMyLocaltion() {
    router.push(`/map/${latitudeUser}/${longitudeUser}`)
  }

  if (
    isLoadingCampuses ||
    isLoadingCategories ||
    isLoadingEvents ||
    isLoadingUniversities
  )
    return <LoadingSpinner />

  return (
    <>
      <div
        className={
          viewMenu ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
      >
        {/* header */}
        <Box sx={{ ...alignSpaceBetween, px: 2, py: 1 }}>
          <Link href="/">
            <Image src={ImageHeader} alt="logo" height={30} />
          </Link>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setViewMenu(false)
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {/* my location */}
        <section className={styles.tag}>
          <Tooltip title={'Ver sua localização'} placement="right" arrow>
            <Typography
              variant="h5"
              onClick={getLocation}
              sx={{
                ...flexAlingCenter,
                mb: 0,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <PersonIcon />
              Sua Localização
            </Typography>
          </Tooltip>
        </section>
        {/* <Divider /> */}
        {/* campus */}
        <section className={styles.tag}>
          <Form
            id="filter-places"
            handler={formHandler}
            onSubmit={async (data: any) => {
              console.log(formHandler.getValues())
              console.log('campusId' + campusId)
              console.log('universityId' + universityId)
            }}
          >
            <Form.SelectInput
              id="universityId"
              label="Universidade"
              gridProps={{
                xs: 12,
                px: '0px !important',
              }}
              formControlProps={{
                sx: { minWidth: 120, width: '100%' },
              }}
              defaultValue={universityId?.toString()}
              values={
                !universities
                  ? []
                  : universities.map((campus: any) => ({
                      value: campus.id.toString(),
                      label: campus.name,
                    }))
              }
            />

            <Form.SelectInput
              id="campusId"
              label="Campus"
              gridProps={{
                xs: 12,
                px: '0px !important',
              }}
              formControlProps={{
                sx: { minWidth: 120, width: '100%' },
              }}
              defaultValue={campusId?.toString()}
              values={
                !campuses
                  ? []
                  : campuses.map((campus: any) => ({
                      value: campus.id.toString(),
                      label: campus.name,
                    }))
              }
            />
            <Form.SubmitBtn
              form="filter-places"
              handler={formHandler}
              gridProps={{
                xs: 12,
                px: '0px !important',
              }}
              btnProps={{
                fullWidth: true,
              }}
            >
              Filtrar
            </Form.SubmitBtn>
          </Form>
        </section>
        <Divider />
        {/* events */}
        <section className={`${styles.events} ${styles.tag}`}>
          <Typography variant="h5" gutterBottom>
            Eventos
          </Typography>
          {isLoadingEvents ? (
            <LoadingSpinner />
          ) : !events ? (
            <Typography gutterBottom>Nenhum evento encontrado</Typography>
          ) : (
            events.map((event, _index) => {
              return (
                <Tooltip
                  key={_index}
                  title={'Ver evento'}
                  placement="right"
                  arrow
                >
                  <Link
                    key={_index}
                    href={`/event/${event.id}`}
                    sx={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'inherit',
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {new Date(event.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Typography>
                  </Link>
                </Tooltip>
              )
            })
          )}
        </section>
        <Divider />
        {/* settings */}
        <section className={styles.tag}>
          <Typography variant="h5" gutterBottom>
            Configurações
          </Typography>
          <Box sx={flexAlingCenter}>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                mr: 2,
              }}
            >
              Tamanho icone:
            </Typography>
            <Slider
              min={1}
              max={8}
              step={1}
              defaultValue={1}
              onChange={(e, newValue) => {
                setRange(newValue as number)
              }}
            />
          </Box>

          <FormControl fullWidth>
            <RadioGroup name="radio-buttons-group">
              {isLoadingCategories ? (
                <LoadingSpinner />
              ) : !categories ? (
                <Typography gutterBottom>
                  Nenhuma categoria encontrada
                </Typography>
              ) : (
                categories.map((category, _index) => (
                  <FormControlLabel
                    key={_index}
                    value={category.id}
                    control={
                      <Radio
                        sx={{
                          py: 0.5,
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">{category.name}</Typography>
                    }
                  />
                ))
              )}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        {/* <section className={styles.tag} id="infos">
          <ul>
            <li>
              <i
                className="fa fa-info-circle "
                style={{
                  color: "white",
                  marginRight: "10px",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              ></i>
              <label style={{ fontWeight: "bold" }}>Informações</label>
            </li>
            <li>
              <label>Latitude: {22222213}</label>
            </li>
            <li>
              <label>Longitude: {88888888}</label>
            </li>
          </ul>
        </section> */}
      </div>
      <div
        className={styles.backdrop}
        style={{
          display: viewMenu ? 'block' : 'none',
        }}
      ></div>
    </>
  )
}
