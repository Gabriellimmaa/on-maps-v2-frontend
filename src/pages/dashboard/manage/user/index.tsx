import { useState } from 'react'
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
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TUser } from './types'
import { DataRole } from '@/data'
import { ModalDelete, ModalEdit } from './components'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useDebounce } from '@/hooks'
import { TGetPlaceFilterQueryParams } from '@/types'
import { Form } from '@/components/Form'
import { LoadingSpinner } from '@/components'
import { getUsersFilter } from '@/api'

const header = ['Ações', 'Nome', 'Email', 'Permissões']

export default function ManageUser() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [data, setData] = useState<TUser>()

  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const formHandler = useForm<{
    name: string
    role: string
  }>({
    shouldUnregister: false,
    defaultValues: {
      role: 'Todos',
    },
  })

  const watchPermission = formHandler.watch('role')
  const watchName = formHandler.watch('name')
  const debouncedSearch = useDebounce(watchName, 500)

  // const { data: users, isLoading: isLoadingUsers } = useQuery(
  //   ['users'],
  //   () => getUsersFilter(params),
  //   {
  //     onSuccess: (data) => {
  //       const modifiedData: any = data
  //       const newValue = {
  //         id: 0,
  //         name: 'Todos',
  //         city: '',
  //         state: '',
  //         createdAt: '',
  //         updatedAt: '',
  //         email: '',
  //         phone: '',
  //         universityId: 0,
  //         place: [],
  //       }
  //       modifiedData.push(newValue)

  //       return modifiedData
  //     },
  //   }
  // )

  // if (isLoadingUsers) return <LoadingSpinner />

  return (
    <>
      {users === undefined ? (
        <Typography variant="h4" textAlign="center">
          Não há lugares cadastrados no sistema.
        </Typography>
      ) : (
        <>
          <Form
            id="filter-places"
            handler={formHandler}
            onSubmit={async (data: any) => {
              console.log(data)
            }}
          >
            <Grid xs={6}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Gerenciar Usuários
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
              id="role"
              label="Permissões"
              gridProps={{
                xs: 3,
              }}
              values={[
                {
                  value: 'Todos',
                  label: 'Todos',
                },
                {
                  value: 'MANAGE_PLACE',
                  label: 'Gerenciar Ambientes',
                },
                {
                  value: 'MANAGE_USER',
                  label: 'Gerenciar Usuários',
                },
              ]}
            />
          </Form>
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  {header.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row: TUser) => (
                  <TableRow key={row.id} sx={styles.tableRow}>
                    <TableCell>
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
                          sx={{ cursor: 'pointer', ml: 1 }}
                          color="error"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {row.firstName} {row.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{row.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {row.role
                          .map((item, _index) => {
                            return DataRole[item].name
                          })
                          .join(', ')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
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
        </>
      )}
    </>
  )
}

const users: TUser[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    role: ['MANAGE_PLACE'],
    createdAt: '2022-02-01T10:00:00.000Z',
    updatedAt: '2022-02-01T10:00:00.000Z',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    role: ['MANAGE_PLACE', 'MANAGE_USER'],
    createdAt: '2022-02-02T12:30:00.000Z',
    updatedAt: '2022-02-02T12:30:00.000Z',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@example.com',
    role: ['MANAGE_PLACE'],
    createdAt: '2022-02-03T14:00:00.000Z',
    updatedAt: '2022-02-03T14:00:00.000Z',
  },
]

const styles = {
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
}
