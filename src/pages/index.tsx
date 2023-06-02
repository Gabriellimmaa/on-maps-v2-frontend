import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { DataCampus } from '@/data'
import { getCampus, getUniversityFilter } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { LoadingSpinner } from '@/components'
import { Box, Button, Link, Typography, useTheme } from '@mui/material'
import { TCampus, TUniversity } from '@/types'
import NearMeIcon from '@mui/icons-material/NearMe'
import MapIcon from '@mui/icons-material/Map'
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()
  const { palette } = useTheme()
  const formHandler = useForm<{
    university: TUniversity
    campusId: number
  }>({
    shouldUnregister: true,
  })

  const watchUniversity = formHandler.watch('university')
  const watchCampusId = formHandler.watch('campusId')

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['universities'],
    () => getUniversityFilter(),
    {
      keepPreviousData: true,
    }
  )

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

  if (isLoadingUniversities) return <LoadingSpinner />

  return (
    <div className={styles.formContainer}>
      <div className={styles.Clouds}>
        <div className={`${styles.containerButtons}`}>
          <section>
            <Image
              src="/UenpLogo.png"
              alt="banner"
              className={styles.bannerImage}
              width={400}
              height={100}
            />
          </section>
          <Form
            id="filter-places"
            handler={formHandler}
            onSubmit={async (data: any) => {
              console.log(data)
            }}
          >
            <Form.SelectInput
              id="university"
              label="Selecione uma Universidade"
              gridProps={{
                xs: 8,
              }}
              values={
                !universities
                  ? []
                  : universities.map((university: any) => ({
                      value: university,
                      label: university.name,
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
                xs: 4,
              }}
              values={
                !'  '
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
          </Form>
          {watchCampusId && (
            <>
              <Button
                component={Link}
                href={`/map/${watchUniversity.id}/${watchCampusId}/${latitude}/${longitude}`}
                width={1}
                startIcon={<NearMeIcon />}
              >
                Ver campus no mapa
              </Button>
            </>
          )}
          <Button
            component={Link}
            href="/place/list"
            width={1}
            sx={{
              background: palette.primary.light,
              '&:hover': {
                background: palette.primary.main,
              },
            }}
          >
            Buscar um ambiente
          </Button>
          <Button
            component={Link}
            href="/event/list"
            width={1}
            sx={{
              background: palette.primary.light,
              '&:hover': {
                background: palette.primary.main,
              },
            }}
          >
            Buscar por eventos e atividades
          </Button>
          <Button
            component={Link}
            href="/about"
            width={1}
            sx={{
              background: palette.tertiary.main,
              color: 'palette.warning.contrastText',
              '&:hover': {
                background: palette.tertiary.dark,
              },
            }}
          >
            Venha contribuir com a plataforma
          </Button>
          <Button
            onClick={() => {
              const authToken = localStorage.getItem('authToken')
              if (authToken) {
                router.push('/dashboard')
              }
              router.push('/login')
            }}
            sx={{
              width: 1,
              background: palette.success.main,
              '&:hover': {
                background: palette.success.dark,
              },
            }}
          >
            Entrar como colaborador
          </Button>
        </div>

        <Typography
          variant="body2"
          component="span"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: 1,
            color: palette.text.disabled,
          }}
        >
          {process.env.VERSION}
        </Typography>

        <div className={`${styles.Cloud} ${styles.Foreground}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Foreground}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Foreground}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Foreground}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Background}`}></div>
        <div className={`${styles.Cloud} ${styles.Foreground}`}></div>
      </div>
    </div>
  )
}

Home.displayName = 'Home'
