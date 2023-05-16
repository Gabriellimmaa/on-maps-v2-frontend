import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent } from '@mui/material'
import { TPostCreateCampusBody } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUniversity, postCampus } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createCampusValidation } from '@/validations/dashboard'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { useEffect } from 'react'
import { onlyNumbers } from '@/utils/helpers'

type TProps = {
  open: boolean
  handleClose: () => void
}

export const ModalCreateCampus = (props: TProps) => {
  const { open, handleClose } = props
  const { createToast } = useToast()

  const formHandler = useForm<TPostCreateCampusBody>({
    mode: 'all',
    resolver: yupResolver(createCampusValidation()),
    defaultValues: {
      name: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      universityId: undefined,
    },
  })

  const { data: universities, isLoading } = useQuery(['university'], () =>
    getUniversity()
  )

  const { mutate: mutateCampus } = useMutation(
    (data: TPostCreateCampusBody) => postCampus(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campus'])
      },
    }
  )

  const handleSubmit = async (data: TPostCreateCampusBody) => {
    try {
      const dataToSubmit = {
        ...data,
        phone: onlyNumbers(data.phone),
      }
      mutateCampus(dataToSubmit)
      createToast(`Universidade criada com sucesso!`, 'success')
    } catch (e) {
      createToast(e as string, 'error')
    }
    handleClose()
  }

  useEffect(() => {
    formHandler.reset()
  }, [formHandler, open])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogHeader onClose={handleClose}>
        <Typography component="span" variant="h6" fontWeight={'bold'}>
          Criar Campus
        </Typography>
      </DialogHeader>
      <DialogContent dividers>
        <Form id="create-campus" handler={formHandler} onSubmit={handleSubmit}>
          <Form.TextInput
            id="name"
            label="Nome do campus"
            gridProps={styles.name}
          />
          <Form.TextInput id="email" label="Email" />
          <Form.TextInput id="city" label="Cidade" gridProps={styles.city} />
          <Form.TextInput id="state" label="Estado" gridProps={styles.state} />
          <Form.SelectInput
            id="universityId"
            label="Universidade"
            gridProps={styles.university}
            values={
              universities
                ? universities.map((row) => ({
                    label: row.name,
                    value: row.id,
                  }))
                : []
            }
          />
          <Form.MaskedTextInput
            id="phone"
            label="Telefone"
            gridProps={styles.phone}
            mask={cellPhoneInputMask}
          />

          <Form.SubmitBtn
            form="create-campus"
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
  city: {
    xs: 12,
    md: 6,
  },
  state: {
    xs: 12,
    md: 6,
  },
  university: {
    xs: 12,
    md: 6,
  },
  phone: {
    xs: 12,
    md: 6,
  },
}
