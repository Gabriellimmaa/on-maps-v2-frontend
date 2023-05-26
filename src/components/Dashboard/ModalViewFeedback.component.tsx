import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getFeedback } from '@/api'
import { useToast } from '@/hooks/useToast.hook'
import { LoadingSpinner } from '../Loading'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalViewFeedback = (props: TProps) => {
  const { open, handleClose } = props
  const { createToast } = useToast()

  const { data: feedback, isLoading } = useQuery(['feedback'], () =>
    getFeedback()
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Feedback
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Grid container sx={{ width: 400 }}>
          <Grid
            item
            xs={10}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="span" variant="h5" whiteSpace={'nowrap'}>
              Muito insatisfeito:
            </Typography>
            <Typography component="span" variant="h5" whiteSpace={'nowrap'}>
              Insatisfeito:
            </Typography>
            <Typography component="span" variant="h5" whiteSpace={'nowrap'}>
              Neutro:
            </Typography>
            <Typography component="span" variant="h5" whiteSpace={'nowrap'}>
              Satisfeito:
            </Typography>
            <Typography component="span" variant="h5" whiteSpace={'nowrap'}>
              Muito satisfeito:
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="span" variant="h5">
              {feedback?.veryDissatisfied}
            </Typography>
            <Typography component="span" variant="h5">
              {feedback?.dissatisfied}
            </Typography>
            <Typography component="span" variant="h5">
              {feedback?.neutral}
            </Typography>
            <Typography component="span" variant="h5">
              {feedback?.satisfied}
            </Typography>
            <Typography component="span" variant="h5">
              {feedback?.verySatisfied}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  name: {
    xs: 12,
  },
  acronym: {
    xs: 12,
  },
  website: {
    xs: 12,
  },
}
