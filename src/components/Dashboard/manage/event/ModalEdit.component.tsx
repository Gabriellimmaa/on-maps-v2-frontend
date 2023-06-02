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
  TUniversity,
} from '@/types'
import { queryClient } from '@/clients'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getPlaceFilter,
  getUniversityFilter,
  postDiscordWebhook,
  putEvent,
  putUser,
} from '@/api'
import { useToast } from '@/hooks/useToast.hook'
import { onlyNumbers, removeMatchingAttributes } from '@/utils/helpers'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import SearchIcon from '@mui/icons-material/Search'
import dynamic from 'next/dynamic'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { useDebounce } from '@/hooks'
import { LoadingSpinner } from '@/components/Loading'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

type TProps = {
  open: boolean
  handleClose: () => void
  data: TEvent | undefined
}

type TFormProps = {
  name: string
  date: string
  organizer: string
  description: string
  emphasis: boolean
  file1: any
  file2: any
  file3: any
  optionPlace: boolean
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
  university?: TUniversity
  campusId?: number
}

export const ModalEdit = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()
  const [markers, setMarkers] = useState<any>(null)
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const latitude = -23.5505199
  const longitude = -46.6333094

  const formHandler = useForm<TFormProps>({
    mode: 'all',
  })

  const watchOptionPlace = formHandler.watch('optionPlace')
  const watchFile1 = formHandler.watch('file1')
  const watchFile2 = formHandler.watch('file2')
  const watchFile3 = formHandler.watch('file3')
  const watchFindPlace = formHandler.watch('findPlace')
  const debouncedSearch = useDebounce(watchFindPlace, 500)
  const watchUniversity = formHandler.watch('university')
  const watchCampusId = formHandler.watch('campusId')

  useEffect(() => {
    formHandler.reset({
      ...data,
      optionPlace: data?.placeId ? true : false,
    })
  }, [data, formHandler])

  const {
    data: places,
    isFetching: isLoadingPlaces,
    refetch,
  } = useQuery(['places', params], () => getPlaceFilter(params), {
    enabled: !!debouncedSearch,
  })

  const { data: universities } = useQuery(['universities'], () =>
    getUniversityFilter()
  )

  const { mutateAsync: mutateDiscordImage } = useMutation(
    postDiscordWebhook,
    {}
  )

  const { mutateAsync, isLoading } = useMutation(
    ({ id, body }: { id: number; body: Partial<TPostCreateEventBody> }) =>
      putEvent(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        createToast('Evento editado com sucesso!', 'success')
        handleClose()
      },
      onError: (error: any) => {
        formHandler.reset()
        createToast(error.response.data.message, 'error')
      },
    }
  )

  useEffect(() => {
    setParams({
      placeName: debouncedSearch,
      campusId: watchCampusId,
    })
  }, [debouncedSearch])

  useEffect(() => {
    formHandler.setValue('position.latitude', markers?.latitude)
    formHandler.setValue('position.longitude', markers?.longitude)
  }, [formHandler, markers])

  if (!data) return null

  return (
    <Dialog onClose={handleClose} open={open} sx={styles.dialog}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Evento
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Form
          id="edit-user"
          handler={formHandler}
          onSubmit={async (dataForm) => {
            try {
              const files = []
              if (dataForm.file1) files.push(dataForm.file1)
              if (dataForm.file2) files.push(dataForm.file2)
              if (dataForm.file3) files.push(dataForm.file3)

              const dataToSubmit: Partial<TPostCreateEventBody> = {
                name: dataForm.name,
                organizer: dataForm.organizer,
                description: dataForm.description,
                date: dataForm.date,
                emphasis: dataForm.emphasis,
                phone: dataForm.phone ? onlyNumbers(dataForm.phone) : undefined,
                instagram: dataForm.instagram ? dataForm.instagram : undefined,
                website: dataForm.website ? dataForm.website : undefined,
              }

              if (files.length > 0) {
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

                dataToSubmit.image = images
              }

              removeMatchingAttributes(dataToSubmit, data)

              if (dataForm.placeId) {
                dataToSubmit.placeId = dataForm.placeId
              }

              if (dataForm.position.name !== data?.position?.name) {
                dataToSubmit.position = {
                  name: dataForm.position.name,
                  latitude: dataForm.position.latitude,
                  longitude: dataForm.position.longitude,
                }
              }
              if (dataForm.optionPlace) {
                delete dataToSubmit.position
              } else {
                delete dataToSubmit.placeId
              }
              await mutateAsync({ id: data.id, body: dataToSubmit })
              queryClient.invalidateQueries(['events'])
              handleClose()
            } catch {}
          }}
        >
          <Form.TextInput id="name" label="Nome" />
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
          {data?.place?.name && (
            <Typography variant="h5" mb={2}>
              Esse evento está vinculado ao local: {data?.place?.name}
            </Typography>
          )}

          {watchOptionPlace ? (
            <>
              <Form.SelectInput
                id="university"
                label={'Universidade'}
                values={
                  universities
                    ? universities?.map((row) => ({
                        label: row.name,
                        value: row,
                      }))
                    : []
                }
                gridProps={{
                  xs: 12,
                }}
                selectProps={{
                  value: watchUniversity ? watchUniversity : '',
                }}
              />
              <Form.SelectInput
                id="campusId"
                label={'Campus'}
                values={
                  watchUniversity
                    ? watchUniversity.campuses.map((row) => ({
                        label: row.name,
                        value: row.id,
                      }))
                    : []
                }
                gridProps={{
                  xs: 12,
                }}
                selectProps={{
                  disabled: !watchUniversity,
                }}
              />
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
                disabled={!!!watchCampusId}
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
              {isLoadingPlaces && (
                <>
                  <LoadingSpinner />
                  <Typography variant="body2" fontSize={15} ml={2}>
                    Buscando dados...
                  </Typography>
                </>
              )}
              {places?.length === 0 && (
                <Typography variant="body2" fontSize={15} ml={2} mb={2}>
                  Nenhum local encontrado
                </Typography>
              )}
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
            form="edit-user"
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
            Editar
          </Form.SubmitBtn>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '80%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  gridxs12md6: {
    xs: 12,
    md: 6,
  },
  buttonFile: {
    height: '150px',
    backgroundColor: 'none',
    borderColor: 'primary.main',
    borderWidth: '2px',
    display: 'flex',
    flexDirection: 'column',
  },
  mapStyles: {
    height: 350,
    width: '100%',
    borderRadius: 4,
  },
}
