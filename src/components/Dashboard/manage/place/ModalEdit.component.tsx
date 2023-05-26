import { Form } from '@/components/Form'
import {
  Button,
  MenuItem,
  Box,
  Grid,
  Select,
  Typography,
  Checkbox,
  ListItemText,
  InputLabel,
  useTheme,
  Link,
  Dialog,
  DialogContent,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { createElement, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { DataCampus, DataMapCategories, DataEquipaments } from '@/data'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import {
  TPostImage,
  TMapCategories,
  TPlace,
  TPostCreatePlaceBody,
  TPostDiscordWebhookResponse,
} from '@/types'
import { Omit } from 'lodash'
import {
  getCampus,
  getCategory,
  getEquipment,
  postDiscordWebhook,
  postPlace,
  putPlace,
} from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/clients'
import { LoadingSpinner } from '@/components'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { useToast } from '@/hooks/useToast.hook'
import { useRouter } from 'next/router'
import { createPlaceValidation } from '@/validations/dashboard/manage/place'
import { onlyNumbers } from '@/utils/helpers'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import { DialogHeader } from '@/components/Dialog'
import { number } from 'yup'

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace | undefined
}

type formProps = any
export function ModalEdit(props: TProps) {
  const { open, handleClose, data } = props

  const router = useRouter()
  const [markers, setMarkers] = useState<any>(null)
  const { createToast } = useToast()
  const { palette } = useTheme()

  const formHandler = useForm<formProps>({
    mode: 'all',
    resolver: yupResolver(createPlaceValidation()),
  })
  const watchArea = formHandler.watch('area')
  const watchCampus = formHandler.watch('campusId')
  const watch24h = formHandler.watch('open24h')
  const watchFile1 = formHandler.watch('file1')
  const watchFile2 = formHandler.watch('file2')
  const watchFile3 = formHandler.watch('file3')

  const { data: responseCampus, isLoading: isLoadingCampus } = useQuery(
    ['campus'],
    () => getCampus()
  )

  const { data: responseCategory, isLoading: isLoadingCategory } = useQuery(
    ['category'],
    () => getCategory()
  )

  const { data: responseEquipment, isLoading: isLoadingEquipment } = useQuery(
    ['equipment'],
    () => getEquipment()
  )

  const { mutateAsync } = useMutation(
    ({ id, body }: { id: number; body: Partial<TPostCreatePlaceBody> }) =>
      putPlace(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['places'])
        formHandler.reset()
        createToast('Ambiente editado com sucesso', 'success')
        handleClose()
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const { mutateAsync: mutateDiscordImage } = useMutation(
    postDiscordWebhook,
    {}
  )

  useEffect(() => {
    if (data) {
      formHandler.reset({
        name: data.name,
        category: data.category,
        description: data.description,
        floor: data.floor,
        building: data.building,
        campusId: data.campusId,
        capacity: data.capacity,
        equipment: data.equipment,
        accessibility: data.accessibility,
        open24h: data.open24h,
        position: data.position,
        date: {
          start: data.date?.start,
          end: data.date?.end,
        },
        responsible: {
          name: data.responsible?.name,
          email: data.responsible?.email,
          phone: onlyNumbers(data.responsible?.phone),
        },
      })
    }
  }, [data, formHandler])

  if (isLoadingCampus || isLoadingCategory || isLoadingEquipment)
    return <LoadingSpinner />

  if (!responseEquipment || !responseCategory || !responseCampus) {
    return (
      <Typography variant="h4" textAlign="center">
        {!responseCampus &&
          'Não é possível criar um ambiente sem mesmo ao ter um campus'}
        <br />
        {!responseCategory &&
          'Não é possível criar um ambiente sem mesmo ao ter um categoria'}
        <br />
        {!responseEquipment &&
          'Não é possível criar um ambiente sem mesmo ao ter um equipamento'}
      </Typography>
    )
  }

  if (!responseCampus)
    return (
      <Box sx={{ ...flexCenterContent, flexDirection: 'column' }}>
        <Typography variant="h4" textAlign="center">
          Não é possível criar um ambiente sem mesmo ao ter um campus
        </Typography>
        <Typography variant="h4" textAlign="center" mb={4}>
          Vá em nossa dashboard e crie um campus
        </Typography>
        <Button component={Link} href="/dashboard">
          Criar campus
        </Button>
      </Box>
    )

  if (!data) return null

  const handleSubmit = async (dataForm: formProps) => {
    const files = []
    if (dataForm.file1) files.push(dataForm.file1)
    if (dataForm.file2) files.push(dataForm.file2)
    if (dataForm.file3) files.push(dataForm.file3)
    try {
      const dataToSubmit: Partial<TPostCreatePlaceBody> = {
        name: dataForm.name,
        category: dataForm.category,
        description: dataForm.description,
        floor: parseInt(dataForm.floor),
        building: dataForm.building,
        campusId: dataForm.campusId,
        capacity: parseInt(dataForm.capacity),
        equipment: dataForm.equipment,
        accessibility: dataForm.accessibility,
        open24h: dataForm.open24h,
        position: dataForm.position,
        responsible: {
          name: dataForm.responsible.name,
          email: dataForm.responsible.email,
          phone: onlyNumbers(dataForm.responsible.phone),
        },
        date: {
          start: new Date(dataForm.date.start).toISOString(),
          end: new Date(dataForm.date.end).toISOString(),
        },
        // @todo update event in the place
        // event: [],
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

      await mutateAsync({ id: data?.id, body: dataToSubmit })
    } catch {
      createToast('Erro ao enviar imagens para o banco', 'error')
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="config-dialog"
      open={open}
      sx={styles.dialog}
    >
      <DialogHeader id="config-dialog-title" onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Editar Ambiente
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Form id="create-place" handler={formHandler} onSubmit={handleSubmit}>
          <Form.TextInput
            id="name"
            label="Nome do local"
            gridProps={styles.gridName}
          />
          <Form.SelectInput
            id="category"
            label="Categoria"
            gridProps={styles.gridCategory}
            values={responseCategory?.map((category: any) => ({
              value: category.name,
              label: category.name,
            }))}
          />
          <Form.TextInput
            id="description"
            label="Descrição"
            gridProps={styles.gridDescription}
            textFieldProps={styles.textDescription}
          />
          <Form.TextInput
            id="floor"
            label="Piso"
            gridProps={styles.gridFloor}
            textFieldProps={{
              inputProps: { type: 'number' },
            }}
          />
          <Form.TextInput
            id="building"
            label="Bloco"
            gridProps={styles.gridBuilding}
          />
          <Form.SelectInput
            id="campusId"
            label="Campus"
            gridProps={styles.gridCampus}
            values={responseCampus.map((campus: any) => ({
              value: campus.id,
              label: campus.name,
            }))}
          />
          <Form.TextInput
            id="capacity"
            label="Capacidade"
            gridProps={styles.gridCapacity}
            textFieldProps={{
              inputProps: { type: 'number' },
            }}
          />
          <Form.SelectCheckboxInput
            id="equipment"
            label="Equipamentos"
            gridProps={styles.gridEquipaments}
            selectProps={styles.selectEquipaments}
            values={responseEquipment.map((equipament) => ({
              value: equipament.name,
              label: equipament.name,
            }))}
          />

          <Form.SwitchInput
            id="accessibility"
            label="Acessibilidade"
            gridProps={styles.gridAccessibility}
          />
          <Form.SwitchInput
            id="open24h"
            label="Aberto 24h"
            gridProps={styles.gridOpen24h}
          />
          <Form.TimePicketInput
            id="date.start"
            label="Horário de Início"
            gridProps={styles.gridDatePicker}
            disabled={watch24h}
          />
          <Form.TimePicketInput
            id="date.end"
            label="Data de Término"
            gridProps={styles.gridDatePicker}
            disabled={watch24h}
          />
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Imagens
            </Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
              gap: 2,
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
          </Box>
          <Typography
            sx={styles.errorPosition}
            visibility={
              formHandler.formState.errors.position ? 'visible' : 'hidden'
            }
          >
            É necessário selecionar uma localização no mapa para o local.
          </Typography>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Responsável do local
            </Typography>
          </Grid>
          <Form.TextInput
            id="responsible.name"
            label="Nome do Responsável"
            gridProps={styles.gridResponsibleName}
          />
          <Form.TextInput
            id="responsible.email"
            label="E-mail do Responsável"
            gridProps={styles.gridResponsibleEmail}
          />
          <Form.MaskedTextInput
            id="responsible.phone"
            label="Telefone do Responsável"
            gridProps={styles.gridResponsiblePhone}
            mask={cellPhoneInputMask}
          />
          <Form.SubmitBtn
            form={'create-place'}
            btnProps={{ sx: { width: 1, height: '54px' } }}
            gridProps={{ xs: 12 }}
            handler={formHandler}
          >
            Editar Ambiente
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
