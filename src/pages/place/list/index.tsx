import { LoadingSpinner, SelectCampus } from '@/components'
import React, { useEffect, useState } from 'react'
import {
  Box,
  TextField,
  Grid,
  Typography,
  ToggleButton,
  Tooltip,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import {
  alignSpaceBetween,
  flexAlingCenter,
  flexCenterContent,
} from '@/utils/cssInJsBlocks'
import WindowIcon from '@mui/icons-material/Window'
import ViewListIcon from '@mui/icons-material/ViewList'
import Image from 'next/image'
import { PlaceCardSearch } from '@/components/Place/PlaceCardSearch.component'
import {
  TCampus,
  TEquipment,
  TGetPlaceFilterQueryParams,
  TPlace,
  TUniversity,
} from '@/types'
import {
  getCampus,
  getCategory,
  getEquipment,
  getPlaceFilter,
  getUniversityFilter,
} from '@/api'
import { useQuery } from '@tanstack/react-query'
import { Form } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { useDebounce } from '@/hooks'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import { queryClient } from '@/clients'

export default function PlaceList() {
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const formHandler = useForm<{
    name: string
    category: string
    university: TUniversity
    campus: string
    equipments: TEquipment[]
  }>({
    shouldUnregister: false,
  })

  const watchName = formHandler.watch('name')
  const watchCategory = formHandler.watch('category')
  const watchUniversity = formHandler.watch('university')
  const watchCampus = formHandler.watch('campus')
  const watchEquipment = formHandler.watch('equipments')
  const debouncedSearch = useDebounce(watchName, 500)

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['universities'],
    () => getUniversityFilter(),
    {
      keepPreviousData: true,
    }
  )

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ['categories'],
    () => getCategory(),
    {
      onSuccess: (data) => {
        const modifiedData = data
        modifiedData.push({
          id: 0,
          name: 'Todas',
        })

        return modifiedData
      },
      keepPreviousData: true,
    }
  )

  const { data: equipments, isLoading: isLoadingEquipments } = useQuery(
    ['equipments'],
    () => getEquipment(),
    {
      onSuccess: (data) => {
        return data
      },
    }
  )

  const { data: places, isFetching: isFetchingPlaces } = useQuery(
    ['search-places', params],
    () => getPlaceFilter(params),
    {
      enabled: !!watchCampus,
      keepPreviousData: true,
      onSuccess: (data) => {
        return data
      },
    }
  )

  const handleClearFilters = () => {
    formHandler.reset({
      name: '',
      category: '',
      university: undefined,
      campus: '',
      equipments: undefined,
    })
  }

  useEffect(() => {
    const teste = {
      campusId: watchCampus ? watchCampus : undefined,
      placeName: !!debouncedSearch ? debouncedSearch : undefined,
      category: watchCategory
        ? watchCategory.includes('Todas')
          ? undefined
          : watchCategory
        : undefined,
    }
    setParams(teste)
  }, [watchCampus, watchCategory, debouncedSearch])

  if (isLoadingCategories || isLoadingUniversities || isLoadingEquipments)
    return <LoadingSpinner />

  return (
    <Box width={1}>
      {/* <Typography variant="h4" mb={5}>
        Buscar Ambientes
      </Typography> */}
      <Form id="filter-places" handler={formHandler} onSubmit={async () => {}}>
        <Grid container columnSpacing={10}>
          <Grid item xs={4}>
            <Box sx={{ ...alignSpaceBetween, mb: 2 }}>
              <Box display={'flex'}>
                <FilterAltIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h5">Filtros</Typography>
              </Box>
              <Tooltip title="Limpar Filtros">
                <RotateLeftIcon
                  onClick={handleClearFilters}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      color: 'primary.main',
                    },
                  }}
                />
              </Tooltip>
            </Box>
            <Form.SelectInput
              id="university"
              label="Selecione uma Universidade"
              gridProps={{
                xs: 12,
              }}
              values={
                !universities
                  ? []
                  : universities.map((row: any) => ({
                      value: row,
                      label: row.name,
                    }))
              }
              selectProps={{
                value: watchUniversity ? watchUniversity : undefined,
              }}
            />
            <Form.SelectInput
              id="campus"
              label="Campus"
              gridProps={{
                xs: 12,
              }}
              values={
                !watchUniversity
                  ? []
                  : watchUniversity.campuses.map((campus: any) => ({
                      value: campus.id,
                      label: campus.name,
                    }))
              }
              selectProps={{
                value: watchCampus ? watchCampus : undefined,
                disabled: !watchUniversity,
              }}
            />
            {watchCampus && (
              <>
                <Form.SelectInput
                  id="category"
                  label="Categoria"
                  gridProps={{
                    xs: 12,
                  }}
                  values={
                    categories
                      ? categories.map((campus: any) => ({
                          value: campus.name,
                          label: campus.name,
                        }))
                      : []
                  }
                  selectProps={{
                    disabled: !watchCampus,
                  }}
                />

                <Form.SelectCheckboxInput
                  id="equipments"
                  label="Equipamentos"
                  gridProps={{
                    xs: 12,
                  }}
                  values={
                    equipments
                      ? equipments?.map((row: any) => ({
                          value: row.name,
                          label: row.name,
                        }))
                      : []
                  }
                  selectProps={{
                    disabled: !watchCampus,
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ ...flexAlingCenter, mb: 2 }}>
              <Typography variant="h5">Buscar ambiente</Typography>
            </Box>
            <Form.TextInput
              id="name"
              label={
                !watchUniversity
                  ? 'Selecione uma universidade'
                  : !watchCampus
                  ? 'Selecione um campus'
                  : 'Pesquise por um ambiente'
              }
              textFieldProps={{
                InputProps: {
                  startAdornment: watchCampus && <Search sx={{ mr: 1 }} />,
                },
              }}
              gridProps={{
                xs: 12,
              }}
              disabled={!watchCampus}
            />
            <Box sx={styles.containerList}>
              {isFetchingPlaces ? (
                <LoadingSpinner />
              ) : places === undefined || watchCampus === '' ? (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  <Image
                    src="/search-animate.svg"
                    width={300}
                    height={300}
                    style={{
                      width: '100%',
                    }}
                    alt={'search image'}
                  />
                </Typography>
              ) : places?.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Nenhum ambiente encontrado
                </Typography>
              ) : (
                places?.map((room) => (
                  <PlaceCardSearch place={room} key={room.id} />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Box>
  )
}

const styles = {
  containerMain: {
    display: 'grid',
  },
  containerCampus: {
    ...flexCenterContent,
    flexDirection: 'grid',
  },
  selectCampus: {
    width: 1,
    borderRadius: 2,
    whiteSpace: 'nowrap',
    '&.Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  subContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '80%',
    justifyItems: 'center',
  },
  searchMainContainer: {
    display: 'block',
    flexDirection: 'column',
    gap: 4,
    mt: 4,
  },
  searchSubContainer: {
    ...flexCenterContent,
    flexDirection: 'row',
    width: '100%',
    gap: 4,
  },
  textField: {
    height: 'auto',
  },
  containerEndAdornment: {
    ml: 1,
    ...flexCenterContent,
  },
  containerList: {
    display: 'flex',
    flexDirection: 'column',
    mt: 4,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 310px)',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: 'secondary.dark',
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'primary.main',
      border: '2px solid #15181C',
      borderColor: 'secondary.dark',
      borderRadius: 2,
    },
  },
}

// const customPlaceholderInput = (campus: string) => {
//   switch (campus) {
//     case 'cornelio':
//       return 'Pesquise por Cornélio Procópio'
//     case 'bandeirantes':
//       return 'Pesquise por Bandeirantes'
//     case 'jacarezinho':
//       return 'Pesquise por Jacarezinho'
//     default:
//       return 'Selecione um campus'
//   }
// }
