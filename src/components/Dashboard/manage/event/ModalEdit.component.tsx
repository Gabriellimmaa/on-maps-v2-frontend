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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TEvent,
  TGetPlaceFilterQueryParams,
  TPostCreateEventBody,
} from '@/types'
import { queryClient } from '@/clients'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPlaceFilter, putEvent, putUser } from '@/api'
import { useToast } from '@/hooks/useToast.hook'
import { removeMatchingAttributes } from '@/utils/helpers'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import SearchIcon from '@mui/icons-material/Search'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

type TProps = {
  open: boolean
  handleClose: () => void
  data: TEvent | undefined
}

export const ModalEdit = (props: TProps) => {
  const { open, handleClose, data } = props
  const { createToast } = useToast()
  const [markers, setMarkers] = useState<any>(null)
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const latitude = -23.5505199
  const longitude = -46.6333094

  const formHandler = useForm({
    mode: 'all',
  })

  const watchOptionPlace = formHandler.watch('optionPlace')
  const watchFile1 = formHandler.watch('file1')
  const watchFile2 = formHandler.watch('file2')
  const watchFile3 = formHandler.watch('file3')

  // useEffect(() => {
  //   formHandler.reset({
  //     username: data?.username,
  //     email: data?.email,
  //     MANAGE_PLACE: data?.permissions.includes('MANAGE_PLACE'),
  //     MANAGE_USER: data?.permissions.includes('MANAGE_USER'),
  //   })
  // }, [data, formHandler])

  const { data: places, isLoading: isLoadingPlaces } = useQuery(
    ['places', params],
    () => getPlaceFilter(params),
    {
      enabled: !!watchOptionPlace,
    }
  )

  const { mutateAsync, isLoading } = useMutation(
    ({ id, body }: { id: number; body: Partial<TPostCreateEventBody> }) =>
      putEvent(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        createToast('Usuário editado com sucesso!', 'success')
        handleClose()
      },
      onError: (error: any) => {
        formHandler.reset()
        createToast(error.response.data.message, 'error')
      },
    }
  )

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
              const dataToSubmit: Partial<TPostCreateEventBody> = {
                name: dataForm.username,
              }

              removeMatchingAttributes(dataToSubmit, data)

              await mutateAsync({ id: data.id, body: dataToSubmit })
              handleClose()
            } catch {}
          }}
        >
          <Form.TextInput id="name" label="Nome" />
          <Form.TextInput id="description" label="Descrição" />
          <Form.TextInput id="organizer" label="Organizador" />
          <Form.DatePickerInput
            id="date"
            label="Data"
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
                id="place"
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
            form="edit-user"
            gridProps={{
              xs: 12,
            }}
            btnProps={{
              sx: {
                width: 1,
              },
              startIcon: isLoading ? (
                <CircularProgress sx={{ color: 'white' }} size={20} />
              ) : null,
              disabled: isLoading,
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
