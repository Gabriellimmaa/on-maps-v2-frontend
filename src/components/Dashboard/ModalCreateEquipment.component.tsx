import { DialogHeader } from '@/components/Dialog'
import {
  Dialog,
  Typography,
  DialogContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Tooltip,
} from '@mui/material'
import { TEquipment, TPostCreateEquipmentBody } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getEquipment, postEquipment } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createEquipmentValidation } from '@/validations/dashboard'
import { LoadingSpinner } from '../Loading'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { ModalDelete } from './ModalDelete.component'
import { ModalUpdateEquipment } from './ModalUpdateEquipment.component'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalCreateEquipment = (props: TProps) => {
  const { open, handleClose } = props
  const [data, setData] = useState<TEquipment | null>(null)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateEquipmentBody>({
    mode: 'all',
    resolver: yupResolver(createEquipmentValidation()),
  })

  const { data: equipments, isLoading } = useQuery(['equipment'], () =>
    getEquipment()
  )

  const { mutate: mutateUniversity } = useMutation(
    (data: TPostCreateEquipmentBody) => postEquipment(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['equipment'])
      },
    }
  )

  const handleSubmit = async (data: TPostCreateEquipmentBody) => {
    try {
      mutateUniversity(data)
      formHandler.reset()
      createToast(`Equipamento criada com sucesso!`, 'success')
    } catch (e) {
      createToast(e as string, 'error')
    }
  }

  if (isLoading) <LoadingSpinner />

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          '& .MuiDialog-paper': { maxWidth: '90%', width: 1 },
        }}
      >
        <DialogHeader onClose={handleClose}>
          <Typography component="span" variant="h6" fontWeight={'bold'}>
            Equipamentos configurações
          </Typography>
        </DialogHeader>
        <DialogContent dividers>
          <Form
            id="create-equipment"
            handler={formHandler}
            onSubmit={handleSubmit}
          >
            <Form.TextInput
              id="name"
              label="Nome do equipamento"
              gridProps={styles.name}
            />
            <Form.SubmitBtn
              form="create-equipment"
              btnProps={{ sx: { width: 1, height: '54px', mb: 3 } }}
              gridProps={{ xs: 4 }}
              handler={formHandler}
            >
              Criar
            </Form.SubmitBtn>
          </Form>
          <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Ações</TableCell>
                  <TableCell>Nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <LoadingSpinner
                      boxProps={{
                        position: 'absolute',
                        margin: 'auto',
                      }}
                    />
                  </Box>
                )}
                {!equipments || equipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Typography variant="h5" my={5} textAlign={'center'}>
                        Nenhum lugar encontrado.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  equipments.map((row) => (
                    <TableRow key={row.id}>
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
                        <Typography variant="body1">{row.name}</Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <ModalDelete
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        data={data}
        type="equipment"
      />
      <ModalUpdateEquipment
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        data={data}
      />
    </>
  )
}

const styles = {
  name: {
    xs: 8,
  },
  acronym: {
    xs: 12,
  },
  website: {
    xs: 12,
  },
}
