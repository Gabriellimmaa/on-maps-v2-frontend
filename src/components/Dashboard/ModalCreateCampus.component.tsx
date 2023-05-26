import { DialogHeader } from '@/components/Dialog'
import { Dialog, Typography, DialogContent } from '@mui/material'
import { TPostCreateCampusBody } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUniversityFilter, postCampus } from '@/api'
import { queryClient } from '@/clients'
import { useToast } from '@/hooks/useToast.hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '../Form'
import { createCampusValidation } from '@/validations/dashboard'
import { cellPhoneInputMask } from '@/utils/inputMasks'
import { useEffect, useLayoutEffect, useState } from 'react'
import { onlyNumbers } from '@/utils/helpers'
import dynamic from 'next/dynamic'

type TProps = {
  open: boolean
  handleClose: () => void
}

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

export const ModalCreateCampus = (props: TProps) => {
  const { open, handleClose } = props
  const [markers, setMarkers] = useState<any>(null)
  const { createToast } = useToast()

  const latitude = -23.5505199
  const longitude = -46.6333094

  const formHandler = useForm<TPostCreateCampusBody>({
    mode: 'all',
    resolver: yupResolver(createCampusValidation()),
    defaultValues: {
      name: '',
      city: '',
      state: '',
      universityId: undefined,
    },
  })

  const { data: universities, isLoading } = useQuery(['university'], () =>
    getUniversityFilter()
  )

  const { mutateAsync: mutateCampus } = useMutation(
    (data: TPostCreateCampusBody) => postCampus(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campus'])
        createToast(`Campus criado com sucesso!`, 'success')
        handleClose()
      },
      onError: (error: any) => {
        createToast(`Erro ao criar campus`, 'error')
      },
    }
  )

  const handleSubmit = async (data: TPostCreateCampusBody) => {
    try {
      await mutateCampus(data)
    } catch {}
  }

  useEffect(() => {
    if (markers) {
      formHandler.setValue('position.0.latitude', markers.latitude)
      formHandler.setValue('position.0.longitude', markers.longitude)
    }
  }, [formHandler, markers])

  useLayoutEffect(() => {
    if (open) {
      formHandler.reset()
    }
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
          <MapComponent
            center={[
              latitude ? latitude : -23.108,
              longitude ? longitude : -50.3594239,
            ]}
            mapClick={{
              type: 'single',
              markers: markers,
              setMarkers: setMarkers,
            }}
            mapStyle={styles.mapStyles}
          ></MapComponent>
          <Form.SubmitBtn
            form="create-campus"
            btnProps={{ sx: { width: 1, height: '54px', mt: 2 } }}
            gridProps={{ xs: 12 }}
            handler={formHandler}
          >
            Criar Campus
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
  },
  phone: {
    xs: 12,
    md: 6,
  },
  mapStyles: {
    height: 350,
    width: '100%',
    borderRadius: 4,
  },
}
