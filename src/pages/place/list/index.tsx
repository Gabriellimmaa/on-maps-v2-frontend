import { LoadingSpinner, SelectCampus } from '@/components'
import React, { useEffect, useState } from 'react'
import { Box, TextField, Grid, Typography, ToggleButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import WindowIcon from '@mui/icons-material/Window'
import ViewListIcon from '@mui/icons-material/ViewList'
import Image from 'next/image'
import { PlaceCardSearch } from '@/components/Place/PlaceCardSearch.component'
import { TGetPlaceFilterQueryParams, TPlace } from '@/types'
import { getCampus, getCategory, getPlaceFilter } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { Form } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { useDebounce } from '@/hooks'

export default function PlaceList() {
  const [campus, setCampus] = React.useState(undefined)
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const formHandler = useForm<{
    name: string
    category: string
  }>({
    shouldUnregister: false,
  })

  const watchName = formHandler.watch('name')
  const watchCategory = formHandler.watch('category')
  const debouncedSearch = useDebounce(watchName, 500)

  const { data: dataCampus, isFetching: isLoadingCampus } = useQuery(
    ['campus'],
    () => getCampus()
  )

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery(
    ['category-list'],
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
    }
  )

  const { data: places, isFetching: isFetchingPlaces } = useQuery(
    ['search-places', params],
    () => getPlaceFilter(params),
    {
      enabled: !!campus,
    }
  )

  useEffect(() => {
    const teste = {
      campusId: campus,
      placeName: !!debouncedSearch ? debouncedSearch : undefined,
      category: watchCategory
        ? watchCategory.includes('Todas')
          ? undefined
          : watchCategory
        : undefined,
    }
    setParams(teste)
  }, [campus, watchCategory, debouncedSearch])

  if (isLoadingCategories) return <LoadingSpinner />

  if (!dataCampus)
    return (
      <Typography variant="h4" textAlign="center">
        Nenhum dado registrado na plataforma 😥
      </Typography>
    )

  return (
    <Box width={1}>
      <Grid container columnSpacing={1}>
        <Grid
          item
          lg={4}
          sx={{
            display: { xs: 'none', lg: 'block' },
          }}
        >
          <Image
            src="/search-animate.svg"
            width={500}
            height={500}
            style={{
              width: '100%',
            }}
            alt={'search image'}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box mx={5}>
            <SelectCampus
              value={campus}
              setValue={setCampus}
              buttons={dataCampus.map((campus) => ({
                value: campus.id,
                label: campus.name,
              }))}
              buttonGroupProps={{
                sx: {
                  width: 1,
                },
              }}
              buttonProps={{
                sx: styles.selectCampus,
              }}
            />
            <Box sx={styles.searchMainContainer}>
              <Box sx={styles.searchSubContainer}>
                <Form
                  id="filter-places"
                  handler={formHandler}
                  onSubmit={async () => {}}
                >
                  <Form.TextInput
                    id="name"
                    label={
                      campus
                        ? 'Pesquise por um ambiente'
                        : 'Selecione um campus'
                    }
                    textFieldProps={{
                      InputProps: {
                        startAdornment: <Search sx={{ mr: 1 }} />,
                      },
                    }}
                    gridProps={{
                      xs: 9,
                    }}
                    disabled={!campus}
                  />
                  {dataCategories && (
                    <Form.SelectInput
                      id="category"
                      label="Categoria"
                      gridProps={{
                        xs: 3,
                      }}
                      values={dataCategories.map((campus: any) => ({
                        value: campus.name,
                        label: campus.name,
                      }))}
                      selectProps={{
                        disabled: !campus,
                      }}
                    />
                  )}
                </Form>
              </Box>
              <Box sx={styles.containerList}>
                {isLoadingCampus || isFetchingPlaces ? (
                  <LoadingSpinner />
                ) : places === undefined ? (
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Instruções para seguir com a pesquisa
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
            </Box>
          </Box>
        </Grid>
      </Grid>
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
