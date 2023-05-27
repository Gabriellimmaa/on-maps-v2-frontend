import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useLayoutEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useQuery } from '@tanstack/react-query'
import { getCampus, getUniversityFilter } from '@/api'
import { LoadingSpinner } from '@/components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

import {
  ModalCreateCampus,
  ModalCreateCategory,
  ModalCreateEquipment,
  ModalCreateUniversity,
  ModalDelete,
  ModalViewFeedback,
} from '@/components/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

const headerUniversity = ['Ações', 'Nome', 'Sigla', 'Campus']
const headerCampus = ['Ações', 'Nome', 'Cidade', 'Universidade', 'Ambientes']

function Dashboard() {
  const router = useRouter()
  const [type, setType] = useState<'university' | 'campus' | null>(null)
  const [data, setData] = useState<any>(null)
  const [openCreateUniversity, setOpenCreateUniversity] = useState(false)
  const [openCreateCampus, setOpenCreateCampus] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [openCreateEquipment, setOpenCreateEquipment] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['university'],
    () => getUniversityFilter()
  )

  const { data: campuses, isLoading: isLoadingCampuses } = useQuery(
    ['campus'],
    () => getCampus()
  )

  useLayoutEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setOpenCreateCategory(true)}
          >
            Categorias
          </Button>
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setOpenCreateEquipment(true)}
          >
            Equipamentos
          </Button>
          <Button
            startIcon={<ThumbUpAltIcon />}
            onClick={() => setOpenFeedback(true)}
          >
            Feedback
          </Button>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4">Universidades</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenCreateUniversity(true)
                }}
              >
                Criar Universidade
              </Button>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 440,
            }}
          >
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  {headerUniversity.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ position: 'relative' }}>
                {isLoadingUniversities && (
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
                {!universities || universities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Typography variant="h5" my={5} textAlign={'center'}>
                        Nenhum lugar encontrado.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  universities.map((row) => (
                    <TableRow key={row.id} sx={styles.tableRow}>
                      <TableCell>
                        <Tooltip title="Editar">
                          <EditIcon
                            onClick={() => {
                              // setData(row)
                              // setOpenEdit(true)
                              // setType('university')
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
                              setType('university')
                            }}
                            sx={{ cursor: 'pointer', ml: 1 }}
                            color="error"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{row.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{row.acronym}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {row.campuses.length}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4">Campus</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenCreateCampus(true)
                }}
              >
                Criar Campus
              </Button>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 440,
            }}
          >
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  {headerCampus.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ position: 'relative' }}>
                {isLoadingCampuses && (
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
                {!campuses || campuses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Typography variant="h5" my={5} textAlign={'center'}>
                        Nenhum lugar encontrado.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  campuses.map((row) => (
                    <TableRow key={row.id} sx={styles.tableRow}>
                      <TableCell>
                        <Tooltip title="Editar">
                          <EditIcon
                            onClick={() => {
                              // setData(row)
                              // setOpenEdit(true)
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
                              setType('campus')
                            }}
                            sx={{ cursor: 'pointer', ml: 1 }}
                            color="error"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{row.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{row.city}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {row.university.acronym}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {row.place.length}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <ModalCreateUniversity
        open={openCreateUniversity}
        handleClose={() => setOpenCreateUniversity(false)}
      />
      <ModalCreateCampus
        open={openCreateCampus}
        handleClose={() => setOpenCreateCampus(false)}
      />
      <ModalCreateCategory
        open={openCreateCategory}
        handleClose={() => setOpenCreateCategory(false)}
      />
      <ModalCreateEquipment
        open={openCreateEquipment}
        handleClose={() => setOpenCreateEquipment(false)}
      />
      <ModalViewFeedback
        open={openFeedback}
        handleClose={() => setOpenFeedback(false)}
      />

      <ModalDelete
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false)
          setData(null)
          setType(null)
        }}
        data={data}
        type={type}
      />
    </>
  )
}

const styles = {
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default Dashboard
