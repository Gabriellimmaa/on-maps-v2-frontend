import { DialogHeader } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { DataRole } from '@/data'
import {
  Dialog,
  Typography,
  DialogContent,
  CircularProgress,
  Box,
  Grid,
  InputAdornment,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TEvent,
  TGetPlaceFilterQueryParams,
  TPostCreateEventBody,
  TPostImage,
} from '@/types'
import { queryClient } from '@/clients'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getPlaceFilter,
  postDiscordWebhook,
  postEvent,
  putEvent,
  putUser,
} from '@/api'
import { useToast } from '@/hooks/useToast.hook'
import { onlyNumbers, removeMatchingAttributes } from '@/utils/helpers'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import SearchIcon from '@mui/icons-material/Search'
import dynamic from 'next/dynamic'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDebounce } from '@/hooks'
import { useRouter } from 'next/router'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { creatEventValidation } from '@/validations/dashboard/manage/event'
import { yupResolver } from '@hookform/resolvers/yup'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

type TFormProps = {
  name: string
  date: string
  organizer: string
  description: string
  emphasis: boolean
  file1: any
  file2: any
  file3: any
  optionPlace: number
  findPlace: string
  phone: string
  instagram: string
  website: string
  placeId?: number
  position?: {
    latitude: number
    longitude: number
    name: string
  }
}

export default function Event() {
  const { createToast } = useToast()
  const router = useRouter()
  const [markers, setMarkers] = useState<any>(null)
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const latitude = -23.5505199
  const longitude = -46.6333094

  const formHandler = useForm<TFormProps>({
    mode: 'all',
    resolver: yupResolver(creatEventValidation()),
  })

  const watchOptionPlace = formHandler.watch('optionPlace')
  const watchFile1 = formHandler.watch('file1')
  const watchFile2 = formHandler.watch('file2')
  const watchFile3 = formHandler.watch('file3')
  const watchFindPlace = formHandler.watch('findPlace')
  const debouncedSearch = useDebounce(watchFindPlace, 500)

  const { data: places, isLoading: isLoadingPlaces } = useQuery(
    ['places', params],
    () => getPlaceFilter(params),
    {
      enabled: !!watchOptionPlace,
    }
  )

  const { mutateAsync: mutateEvent, isLoading } = useMutation(
    (body: TPostCreateEventBody) => postEvent(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['events'])
        formHandler.reset()
        router.push('/dashboard/manage/event')
        createToast('Evento criado com sucesso!', 'success')
      },
      onError: (error: any) => {
        formHandler.reset()
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const { mutateAsync: mutateDiscordImage } = useMutation(
    postDiscordWebhook,
    {}
  )

  useEffect(() => {
    setParams({
      placeName: debouncedSearch,
    })
  }, [debouncedSearch])

  useEffect(() => {
    formHandler.setValue('position.latitude', markers?.latitude)
    formHandler.setValue('position.longitude', markers?.longitude)
  }, [formHandler, markers])

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Criar Evento
      </Typography>

      <Form
        id="create-event"
        handler={formHandler}
        onChange={(data) => {
          console.log(formHandler.getValues())
        }}
        onSubmit={async (dataForm: TFormProps) => {
          const files = [dataForm.file1, dataForm.file2, dataForm.file3]
          const formData = new FormData()
          files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file)
          })
          const responseDiscord = await mutateDiscordImage(formData)
          const images = responseDiscord.attachments.map((attachment) => {
            const data: TPostImage = {
              url: attachment.url,
              name: attachment.filename,
              size: attachment.size,
              type: attachment.content_type,
            }
            return data
          })

          const dataToSubmit: TPostCreateEventBody = {
            name: dataForm.name,
            organizer: dataForm.organizer,
            description: dataForm.description,
            date: dataForm.date,
            emphasis: dataForm.emphasis,
            image: images,
            phone: dataForm.phone ? onlyNumbers(dataForm.phone) : undefined,
            instagram: dataForm.instagram ? dataForm.instagram : undefined,
            website: dataForm.website ? dataForm.website : undefined,
          }

          if (dataForm.placeId) {
            dataToSubmit.placeId = dataForm.placeId
          }

          if (dataForm.position) {
            if (dataForm.position.name !== '') {
              dataToSubmit.position = {
                name: dataForm.position.name,
                latitude: dataForm.position.latitude,
                longitude: dataForm.position.longitude,
              }
            }
          }
          try {
            await mutateEvent(dataToSubmit)
          } catch {}
        }}
      >
        <Form.TextInput id="name" label="Nome do evento" />
        <Form.TextInput id="organizer" label="Organizador" />
        <Form.TextEditorInput
          id="description"
          label="Descrição do evento"
          gridProps={{
            xs: 12,
          }}
        />
        <Form.DateTimeInput
          id="date"
          label="Data e hora do evento"
          gridProps={{
            xs: 6,
          }}
        />
        <Form.SwitchInput
          id="emphasis"
          label="Prioridade"
          tooltipProps={{
            title: 'Define se o evento é prioridade ou não',
            placement: 'right',
          }}
          gridProps={{
            xs: 6,
          }}
        />
        <Form.MaskedTextInput
          id="phone"
          label="Celular"
          mask={cellPhoneInputMask}
          gridProps={{
            xs: 4,
          }}
        />
        <Form.TextInput
          id="instagram"
          label="Instagram"
          gridProps={{
            xs: 4,
          }}
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" fontSize={15}>
                    @
                  </Typography>
                </InputAdornment>
              ),
            },
          }}
        />
        <Form.TextInput
          id="website"
          label="Website"
          gridProps={{
            xs: 4,
          }}
        />

        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'start',
            width: '100%',
            gap: 2,
            mb: 2,
          }}
        >
          <Form.FileInput
            id="file1"
            placeholder="Adicionar Imagem"
            btnProps={{
              sx: {
                borderStyle: watchFile1 ? 'solid' : 'dashed',
                ...styles.buttonFile,
              },
              startIcon: watchFile1 ? <ImageIcon /> : <AddIcon />,
              fullWidth: true,
            }}
          />
          {watchFile1 && (
            <Form.FileInput
              id="file2"
              placeholder="Adicionar Imagem"
              btnProps={{
                sx: {
                  borderStyle: watchFile2 ? 'solid' : 'dashed',
                  ...styles.buttonFile,
                },
                startIcon: watchFile2 ? <ImageIcon /> : <AddIcon />,
                fullWidth: true,
              }}
            />
          )}
          {watchFile2 && (
            <Form.FileInput
              id="file3"
              placeholder="Adicionar Imagem"
              btnProps={{
                sx: {
                  borderStyle: watchFile3 ? 'solid' : 'dashed',
                  ...styles.buttonFile,
                },
                startIcon: watchFile3 ? <ImageIcon /> : <AddIcon />,
                fullWidth: true,
              }}
            />
          )}
        </Grid>

        <Form.SwitchInput
          id="optionPlace"
          label="Deseja vincular a um local já existente ou criar um novo?"
          tooltipProps={{
            title: 'Vincula a um local já existente em nosso sistema',
            placement: 'right',
          }}
          gridProps={{
            xs: 12,
          }}
        />

        {watchOptionPlace ? (
          <>
            <Form.TextInput
              id="findPlace"
              label="Pesquisar local"
              textFieldProps={{
                InputProps: {
                  startAdornment: <SearchIcon />,
                },
              }}
              gridProps={{
                xs: 6,
              }}
            />
            <Form.SelectInput
              id="placeId"
              label={'Local'}
              values={
                places
                  ? places?.map((place) => ({
                      label: place.name,
                      value: place.id,
                    }))
                  : []
              }
              gridProps={{
                xs: 6,
              }}
            />
          </>
        ) : (
          <>
            <Form.TextInput
              id="position.name"
              label="Nome do lugar"
              gridProps={{
                xs: 12,
              }}
            />
            <MapComponent
              center={[
                latitude ? latitude : -23.108,
                longitude ? longitude : -50.3594239,
              ]}
              mapClick={{
                type: 'single',
                markers: markers,
                setMarkers: setMarkers,
              }}
              mapStyle={styles.mapStyles}
            ></MapComponent>
          </>
        )}

        <Form.SubmitBtn
          form="create-event"
          gridProps={{
            xs: 12,
          }}
          btnProps={{
            sx: {
              width: 1,
            },
          }}
          handler={formHandler}
        >
          Criar Evento
        </Form.SubmitBtn>
      </Form>
    </>
  )
}

const styles = {
  cleanMarkersBtn: {
    whiteSpace: 'nowrap',
    position: 'absolute',
    zIndex: 999,
    right: 0,
    borderBottom: 2,
    borderLeft: 2,
    borderRadius: 0,
    borderBottomLeftRadius: 8,
  },
  mapStyles: {
    height: 350,
    width: '100%',
    borderRadius: 4,
  },
  gridAccessibility: { xs: 12, sm: 3, md: 2 },
  gridOpen24h: { xs: 12, sm: 3, md: 2 },
  gridEquipaments: { xs: 12, sm: 6, md: 4 },
  gridDescription: {
    xs: 12,
    sx: {
      height: 155,
    },
  },
  gridFloor: { xs: 6, sm: 6, md: 4 },
  gridBuilding: { xs: 6, sm: 6, md: 4 },
  gridCampus: { xs: 6, sm: 6, md: 4 },
  gridCapacity: { xs: 6, sm: 6, md: 4 },
  gridArea: {
    xs: 12,
    sx: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  gridResponsibleName: { md: 4, xs: 12 },
  gridResponsibleEmail: { md: 4, xs: 12 },
  gridResponsiblePhone: { md: 4, xs: 12 },
  gridDatePicker: { md: 6, xs: 12 },
  gridCategory: { xs: 12, sm: 4 },
  gridName: { xs: 12, sm: 8 },
  selectEquipaments: {
    sx: {
      '& .MuiSelect-selectMenu': {
        height: '100%',
      },
    },
  },
  textDescription: {
    multiline: true,
    rows: 4,
    sx: {
      height: '100%',
    },
  },
  errorPosition: {
    color: 'error.main',
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    marginRigth: 'auto',
    marginTop: '3px',
    marginRight: '14px',
    marginBottom: 0,
    marginLeft: '14px',
  },
  buttonFile: {
    height: '150px',
    backgroundColor: 'none',
    borderColor: 'primary.main',
    borderWidth: '2px',
    display: 'flex',
    flexDirection: 'column',
  },
}
