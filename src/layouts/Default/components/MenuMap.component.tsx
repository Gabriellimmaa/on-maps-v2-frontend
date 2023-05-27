import { DataCampus } from '@/data'
import {
  Link,
  Menu,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import NearMeIcon from '@mui/icons-material/NearMe'
import { getCampus, getCampusById, getUniversityFilter } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { TUniversity } from '@/types'
import { LoadingSpinner } from '@/components'
import { alignSpaceBetween } from '@/utils/cssInJsBlocks'

type TProps = {
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: () => void
}

export const MenuMap = ({ anchorEl, open, handleClose }: TProps) => {
  const formHandler = useForm<{
    university: TUniversity
    campusId: string
  }>({})

  const watchUniversity = formHandler.watch('university')
  const watchCampusId = formHandler.watch('campusId')

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['universities'],
    () => getUniversityFilter(),
    {
      keepPreviousData: true,
    }
  )

  if (isLoadingUniversities) {
    return <LoadingSpinner />
  }

  const latitude = watchUniversity
    ? watchUniversity.campuses.find(
        (campus) => campus.id.toString() === watchCampusId.toString()
      )?.position[0].latitude
    : undefined
  const longitude = watchUniversity
    ? watchUniversity.campuses.find(
        (campus) => campus.id.toString() === watchCampusId.toString()
      )?.position[0].longitude
    : undefined

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2} maxWidth={450}>
        <Form
          id="filter-places"
          handler={formHandler}
          onSubmit={async (data: any) => {
            console.log(formHandler.getValues())
          }}
        >
          <Grid item xs={12}>
            <Box sx={{ ...alignSpaceBetween, mb: 2 }}>
              <Typography variant="h5" component="h6">
                Filtrar por:
              </Typography>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={handleClose}
                sx={{
                  p: 0,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
          <Form.SelectInput
            id="university"
            label="Universidade"
            gridProps={{
              xs: 12,
            }}
            formControlProps={{
              sx: { minWidth: 120, width: '100%' },
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
              value: watchUniversity ? watchUniversity : '',
            }}
          />

          <Form.SelectInput
            id="campusId"
            label="Campus"
            gridProps={{
              xs: 12,
            }}
            formControlProps={{
              sx: { minWidth: 120, width: '100%' },
            }}
            values={
              !watchUniversity
                ? []
                : watchUniversity.campuses.map((row: any) => ({
                    value: row.id.toString(),
                    label: row.name,
                  }))
            }
            selectProps={{
              disabled: !watchUniversity,
              value: watchCampusId ? watchCampusId : '',
            }}
          />
          <Button
            component={Link}
            href={
              !!watchCampusId
                ? `/map/${watchUniversity.id}/${watchCampusId}/${latitude}/${longitude}`
                : ''
            }
            sx={{
              ml: 1,
              mt: 1,
              width: 1,
            }}
            startIcon={<NearMeIcon />}
            disabled={!watchCampusId}
          >
            Ver campus no mapa
          </Button>
        </Form>
      </Box>
      {/* {DataCampus.map((campus, index) => (
        <MenuItem key={index}>
          <Link href={`/map/${campus.lat}/${campus.lng}`}>{campus.title}</Link>
        </MenuItem>
      ))} */}
    </Menu>
  )
}
