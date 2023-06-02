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
  Grid,
  Box,
  Button,
  Link,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TEvent, TGetEventFilterQueryParams } from '@/types'
import { ModalDelete, ModalEdit } from '@/components/Dashboard/manage/event'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useDebounce } from '@/hooks'
import { Form } from '@/components/Form'
import { LoadingSpinner } from '@/components'
import { getEventFilter } from '@/api'
import AddIcon from '@mui/icons-material/Add'
import CircleIcon from '@mui/icons-material/Circle'
import LaunchIcon from '@mui/icons-material/Launch'
import { ModalImage } from '@/components/Dashboard'

const header = ['Ações', 'Nome', 'Data', 'Lugar', 'Prioridade', '']

export default function ManageEvent() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [data, setData] = useState<TEvent>()

  const [params, setParams] = useState<TGetEventFilterQueryParams>({})

  const formHandler = useForm<{
    name: string
    permission: string
  }>({
    shouldUnregister: false,
  })

  const watchName = formHandler.watch('name')
  const debouncedSearch = useDebounce(watchName, 500)

  const { data: events, isLoading: isLoadingEvents } = useQuery(
    ['events', params],
    () => getEventFilter(params)
  )

  useEffect(() => {
    if (debouncedSearch) {
      if (watchName === '') {
        setParams({})
        return
      }
      setParams({
        name: debouncedSearch,
      })
    }
  }, [debouncedSearch, watchName])

  return (
    <>
      <Form
        id="filter-events"
        handler={formHandler}
        onSubmit={async (data: any) => {
          console.log(data)
        }}
      >
        <Grid item xs={7}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Gerenciar Eventos
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            component={Link}
            href="/dashboard/create/event"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenCreate(true)
            }}
            sx={{
              width: 1,
              height: 54,
              mt: -2,
            }}
          >
            Criar Evento
          </Button>
        </Grid>
        <Form.TextInput
          id="name"
          label="Nome"
          gridProps={{
            xs: 3,
          }}
        />
      </Form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
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
              height: isLoadingEvents ? 100 : 'auto',
            }}
          >
            {isLoadingEvents && (
              <Box sx={styles.overlay}>
                <LoadingSpinner
                  boxProps={{
                    position: 'absolute',
                    margin: 'auto',
                  }}
                />
              </Box>
            )}
            {events?.length === 0 && (
              <TableRow>
                <TableCell colSpan={12}>
                  <Typography variant="h5" my={5} textAlign={'center'}>
                    Nenhum evento encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {events?.map((row: TEvent) => (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell sx={{ minWidth: 130 }}>
                  <Tooltip title="Editar">
                    <EditIcon
                      onClick={() => {
                        setData(row)
                        setOpenEdit(true)
                      }}
                      sx={{ cursor: 'pointer', mr: 1 }}
                      color="primary"
                    />
                  </Tooltip>
                  <Tooltip title="Deletar">
                    <DeleteIcon
                      onClick={() => {
                        setData(row)
                        setOpenDelete(true)
                      }}
                      sx={{ cursor: 'pointer', mr: 1 }}
                      color="error"
                    />
                  </Tooltip>
                  <Tooltip title="Ver Imagem">
                    <ImageIcon
                      onClick={() => {
                        setData(row)
                        setOpenImage(true)
                      }}
                      sx={{ cursor: 'pointer', mr: 1 }}
                      color="primary"
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {new Date(row.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      minute: '2-digit',
                      hour: '2-digit',
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {row.place
                      ? row.place.name
                      : row.position
                      ? row.position.name
                      : '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {row.emphasis ? (
                      <CircleIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CircleIcon sx={{ color: 'error.main' }} />
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver Evento" placement="left">
                    <Link href={`/event/${row.id}`}>
                      <LaunchIcon sx={{ cursor: 'pointer' }} />
                    </Link>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
