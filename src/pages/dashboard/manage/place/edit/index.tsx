import { Form } from '@/components/Form'
import { Button, Box, Grid, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { DataCampus, DataMapCategories, DataEquipaments } from '@/data'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { TPlace } from '@/types'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import React from 'react'
import { ModalDelete } from '../components'
import { createPlace } from '../components/validations'
import ImageSwiperDelete from '../components/ImageSwiperDelete.component'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

type TProps = {
  open: boolean
  handleClose: () => void
  data: TPlace
}

export default function EditPlace(props: TProps) {
  const [markers, setMarkers] = useState<any>(null)
  const [openDelete, setOpenDelete] = useState(false)

  const formHandler = useForm<{
    name: string
    category: string
    description: string
    floor: string
    building: string
    campus: string
    capacity: number | null
    equipments: string[]
    accessibility: boolean
    open24h: boolean
    area: boolean
    position: any
  }>({
    mode: 'all',
    resolver: yupResolver(createPlace()),
    // defaultValues: {
    //   name: props.data?.name,
    //   category: props.data?.category,
    //   description: props.data?.description,
    //   floor: props.data?.floor,
    //   building: props.data?.building,
    //   campus: props.data?.campus,
    //   capacity: props.data?.capacity,
    //   equipments: props.data?.equipments,
    //   accessibility: props.data?.accessibility,
    //   open24h: props.data?.open24h,
    //   position: props.data?.position,
    // },
  })
  const watchArea = formHandler.watch('area')
  const watchCampus = formHandler.watch('campus')
  const watch24h = formHandler.watch('open24h')

  useEffect(() => {
    if (watchArea) {
      setMarkers([])
      return
    }
    setMarkers(null)
  }, [watchArea])

  useEffect(() => {
    if (watchArea) {
      formHandler.setValue('position', markers)
      formHandler.clearErrors('position')
    } else {
      formHandler.setValue('position', [markers])
      formHandler.clearErrors('position')
    }
  }, [formHandler, markers, watchArea])

  const latitude = DataCampus.find(
    (campus) => campus.value === watchCampus
  )?.lat
  const longitude = DataCampus.find(
    (campus) => campus.value === watchCampus
  )?.lng

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Editar o Local
      </Typography>

      <Form
        id="create-place"
        handler={formHandler}
        onSubmit={async (data) => {
          console.log(data)
        }}
      >
        <Form.TextInput
          id="name"
          label="Nome do local"
          gridProps={styles.gridName}
        />
        <Form.SelectInput
          id="category"
          label="Categoria"
          gridProps={styles.gridCategory}
          values={DataMapCategories.filter(
            (category) => category.value !== 'todos'
          ).map((category) => ({
            value: category.value,
            label: category.title,
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
          id="campus"
          label="Campus"
          gridProps={styles.gridCampus}
          values={[
            { value: 'bandeirantes', label: 'Bandeirantes' },
            { value: 'jacarezinho', label: 'Jacarezinho' },
            { value: 'cornelio procopio', label: 'Cornélio Procópio' },
          ]}
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
          id="equipments"
          label="Equipamentos"
          gridProps={styles.gridEquipaments}
          selectProps={styles.selectEquipaments}
          values={DataEquipaments.map((equipament) => ({
            value: equipament.value,
            label: equipament.title,
          }))}
        />

        <Form.DatePickerInput
          id="date.start"
          label="Data de Início"
          gridProps={styles.gridDatePicker}
          disabled={watch24h}
        />
        <Form.DatePickerInput
          id="date.end"
          label="Data de Término"
          gridProps={styles.gridDatePicker}
          disabled={watch24h}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
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
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
          marginTop={5}
        >
          <Typography variant="h4" mb={2}>
            Editar a Imagem
          </Typography>
          <Typography>Clique e arraste para o lado</Typography>
          <ImageSwiperDelete data={props.data} />
        </Box>
        <Grid item xs={12} marginTop={5}>
          <Typography variant="h4" mb={2}>
            Selecione o local no mapa
          </Typography>
        </Grid>
        <Form.SwitchInput
          id="area"
          label="Mapear Área Grande"
          gridProps={styles.gridArea}
        />
        <MapComponent
          center={[
            latitude ? latitude : -23.108,
            longitude ? longitude : -50.3594239,
          ]}
          mapClick={{
            type: watchArea ? 'multiple' : 'single',
            markers: markers,
            setMarkers: setMarkers,
          }}
          mapStyle={styles.mapStyles}
        >
          <Button
            sx={styles.cleanMarkersBtn}
            startIcon={<CleaningServicesIcon />}
            onClick={() => {
              watchArea ? setMarkers([]) : setMarkers([null])
            }}
          >
            Limpar marcadores
          </Button>
        </MapComponent>
        <Typography
          sx={styles.errorPosition}
          visibility={
            formHandler.formState.errors.position ? 'visible' : 'hidden'
          }
        >
          É necessário selecionar uma localização no mapa para o local.
        </Typography>
        <Form.SubmitBtn
          form={'create-place'}
          btnProps={{ sx: { width: 1, height: '54px' } }}
          gridProps={{ xs: 12 }}
          handler={formHandler}
        >
          Editar o Local
        </Form.SubmitBtn>
      </Form>
      <ModalDelete
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        data={props?.data}
      />
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
  gridAccessibility: { xs: 22, sm: 13, md: 12 },
  gridOpen24h: { xs: 22, sm: 13, md: 12 },
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
}
