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
import {
  TCategory,
  TPostCreateCategoryBody,
  TPostCreateUniversityBody,
  TUniversity,
} from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCategory, postCategory, postUniversity } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createCategoryValidation } from './validations'
import { LoadingSpinner } from '../Loading'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { ModalDelete } from './ModalDelete.component'
import { ModalUpdateCategory } from './ModalUpdateCategory.component'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalCreateCategory = (props: TProps) => {
  const { open, handleClose } = props
  const [data, setData] = useState<TCategory | null>(null)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateCategoryBody>({
    mode: 'all',
    resolver: yupResolver(createCategoryValidation()),
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ['category'],
    () => getCategory()
  )

  const { mutate: mutateUniversity } = useMutation(
    (data: TPostCreateCategoryBody) => postCategory(data)
  )

  const handleSubmit = async (data: TPostCreateCategoryBody) => {
    try {
      mutateUniversity(data)
      queryClient.invalidateQueries(['university'])
      formHandler.reset()
      createToast(`Categoria criada com sucesso!`, 'success')
      return
    } catch (e) {
      createToast(e as string, 'error')
    }
    handleClose()
  }

  if (isLoadingCategories) <LoadingSpinner />

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
            Categoria configurações
          </Typography>
        </DialogHeader>
        <DialogContent dividers>
          <Form
            id="create-category"
            handler={formHandler}
            onSubmit={handleSubmit}
          >
            <Form.TextInput
              id="name"
              label="Nome da categoria"
              gridProps={styles.name}
            />
            <Form.SubmitBtn
              form="create-category"
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
                {isLoadingCategories && (
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
                {!categories || categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Typography variant="h5" my={5} textAlign={'center'}>
                        Nenhum lugar encontrado.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((row) => (
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
        type="category"
      />
      <ModalUpdateCategory
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