import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent, Box } from '@mui/material'
import { TPostCreateUniversityBody, TUniversity } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { postUniversity } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createUniversityValidation } from '@/validations/dashboard'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalCreateUniversity = (props: TProps) => {
  const { open, handleClose } = props
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateUniversityBody>({
    mode: 'all',
    resolver: yupResolver(createUniversityValidation()),
    defaultValues: {
      name: '',
      acronym: '',
      website: '',
    },
  })

  const { mutateAsync: mutateUniversity } = useMutation(
    (data: TPostCreateUniversityBody) => postUniversity(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['university'])
        createToast(`Universidade criada com sucesso!`, 'success')
        handleClose()
      },
      onError: (error: any) => {
        createToast(error.response.data.message, 'error')
      },
    }
  )

  const handleSubmit = async (data: TPostCreateUniversityBody) => {
    try {
      await mutateUniversity(data)
    } catch {}
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Criar Universidade
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Form
          id="create-university"
          handler={formHandler}
          onSubmit={handleSubmit}
        >
          <Form.TextInput
            id="name"
            label="Nome da instituição"
            gridProps={styles.name}
          />
          <Form.TextInput
            id="acronym"
            label="Sigla"
            gridProps={styles.acronym}
            type="uppercase"
          />
          <Form.TextInput
            id="website"
            label="Website"
            gridProps={styles.website}
          />
          <Form.SubmitBtn
            form="create-university"
            btnProps={{ sx: { width: 1, height: '54px', mt: 2 } }}
            gridProps={{ xs: 12 }}
            handler={formHandler}
          >
            Criar Universidade
          </Form.SubmitBtn>
        </Form>
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
