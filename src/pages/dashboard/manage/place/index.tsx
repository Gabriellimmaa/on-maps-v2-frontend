import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  Box,
  Grid,
  Link,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import { ModalDelete, ModalEdit } from '@/components/Dashboard/manage/place'
import { useQuery } from '@tanstack/react-query'
import { TPlace, TGetPlaceFilterQueryParams } from '@/types'
import { LoadingSpinner } from '@/components'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { useDebounce } from '@/hooks'
import { getCampus, getPlaceFilter } from '@/api'
import LaunchIcon from '@mui/icons-material/Launch'
import { ModalImage } from '@/components/Dashboard'

const header = ['Ações', 'Nome', 'Campus', 'Bloco', 'Piso', '']

type formProps = {
  campusId: number
  name: string
}

export default function ManagePlace() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [data, setData] = useState<TPlace | undefined>()

  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const formHandler = useForm<formProps>({
    shouldUnregister: false,
  })

  const watchCampusId = formHandler.watch('campusId')
  const watchName = formHandler.watch('name')
  const debouncedSearch = useDebounce(watchName, 500)

  const { data: campus, isLoading: isLoadingCampus } = useQuery(
    ['campus'],
    () => getCampus(),
    {
      onSuccess: (data) => {
        const modifiedData: any = data
        const newValue = {
          id: 0,
          name: 'Todos',
          city: '',
          state: '',
          createdAt: '',
          updatedAt: '',
          email: '',
          phone: '',
          universityId: 0,
          place: [],
        }
        modifiedData.push(newValue)

        return modifiedData
      },
    }
  )

  const {
    data: places,
    isFetching: isLoadingPlaces,
    isInitialLoading,
  } = useQuery(['places', params], () => getPlaceFilter(params), {
    keepPreviousData: true,
  })

  useEffect(() => {
    if (!watchCampusId || watchCampusId === 0) {
      if (!!debouncedSearch) {
        setParams({
          placeName: debouncedSearch,
        })
        return
      }
      setParams({})
      return
    }
    if (watchCampusId) {
      if (!!debouncedSearch) {
        setParams({
          placeName: debouncedSearch,
          campusId: watchCampusId,
        })
        return
      }
      setParams({
        campusId: watchCampusId,
      })
    }
  }, [watchCampusId, debouncedSearch])

  if (isInitialLoading || isLoadingCampus) return <LoadingSpinner />

  if (!campus)
    return (
      <Typography variant="h4" textAlign="center">
        Existe pendentências para serem resolvidas, vá para o inicio da
        dashboard e valide os dados.
      </Typography>
    )

  return (
    <>
      <Form
        id="filter-places"
        handler={formHandler}
        onSubmit={async (data: any) => {
          console.log(data)
        }}
      >
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Gerenciar Ambientes
          </Typography>
        </Grid>
        <Form.TextInput
          id="name"
          label="Nome"
          gridProps={{
            xs: 3,
          }}
        />

        <Form.SelectInput
          id="campusId"
          label="Campus"
          gridProps={{
            xs: 3,
          }}
          values={campus.map((campus: any) => ({
            value: campus.id,
            label: campus.name,
          }))}
        />
      </Form>
      <Box
        sx={{
          overflowY: 'auto',
          height: 'calc(100vh - 250px)',
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {header.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: 'relative',
              }}
            >
              {isLoadingPlaces && (
                <Box sx={styles.overlay}>
                  <LoadingSpinner
                    boxProps={{
                      position: 'absolute',
                      margin: 'auto',
                    }}
                  />
                </Box>
              )}
              {places?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12}>
                    <Typography variant="h5" my={5} textAlign={'center'}>
                      Nenhum ambiente encontrado.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                places?.map((place) => (
                  <TableRow key={place.id} sx={styles.tableRow}>
                    <TableCell sx={{ minWidth: 130 }}>
                      <Tooltip title="Editar">
                        <EditIcon
                          onClick={() => {
                            setData(place)
                            setOpenEdit(true)
                          }}
                          sx={{ cursor: 'pointer', mr: 1 }}
                          color="primary"
                        />
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <DeleteIcon
                          onClick={() => {
                            setData(place)
                            setOpenDelete(true)
                          }}
                          sx={{ cursor: 'pointer', mr: 1 }}
                          color="error"
                        />
                      </Tooltip>
                      <Tooltip title="Ver Imagem">
                        <ImageIcon
                          onClick={() => {
                            setData(place)
                            setOpenImage(true)
                          }}
                          sx={{ cursor: 'pointer', mr: 1 }}
                          color="primary"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{place.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {place.campus.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{place.building}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{place.floor}</Typography>
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Ver Ambiente" placement="left">
                        <Link href={`/place/${place.id}`}>
                          <LaunchIcon sx={{ cursor: 'pointer' }} />
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ModalDelete
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        data={data}
      />

      <ModalEdit
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        data={data}
      />

      <ModalImage
        open={openImage}
        handleClose={() => setOpenImage(false)}
        images={data?.image}
      />
    </>
  )
}

const styles = {
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%',
  },
}
