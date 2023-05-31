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
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TUser } from '@/types'
import { DataRole } from '@/data'
import { ModalDelete, ModalEdit } from '@/components/Dashboard/manage/user'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useDebounce } from '@/hooks'
import { TGetUserFilterQueryParams } from '@/types'
import { Form } from '@/components/Form'
import { LoadingSpinner } from '@/components'
import { getUserFilter } from '@/api'

const header = ['Ações', 'Nome', 'Email', 'Permissões']

export default function ManageUser() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [data, setData] = useState<TUser>()

  const [params, setParams] = useState<TGetUserFilterQueryParams>({})

  const formHandler = useForm<{
    name: string
    permission: string
  }>({
    shouldUnregister: false,
    defaultValues: {
      permission: 'Todos',
    },
  })

  const watchPermission = formHandler.watch('permission')
  const watchName = formHandler.watch('name')
  const debouncedSearch = useDebounce(watchName, 500)

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    ['users', params],
    () => getUserFilter(params)
  )

  useEffect(() => {
    setParams({
      name: debouncedSearch,
      permission: watchPermission === 'Todos' ? undefined : watchPermission,
    })
  }, [watchPermission, debouncedSearch])

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
          id="permission"
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
              height: isLoadingUsers ? 100 : 'auto',
            }}
          >
            {isLoadingUsers && (
              <Box sx={styles.overlay}>
                <LoadingSpinner
                  boxProps={{
                    position: 'absolute',
                    margin: 'auto',
                  }}
                />
              </Box>
            )}
            {users?.length === 0 && (
              <TableRow>
                <TableCell colSpan={12}>
                  <Typography variant="h5" my={5} textAlign={'center'}>
                    Nenhum usuário encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {users?.map((row: TUser) => (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell sx={{ minWidth: 90 }}>
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
                  <Typography variant="body1">{row.username}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {row.permissions
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
