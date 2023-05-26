import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { DataCampus } from '@/data'
import { getCampus, getUniversityFilter } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { LoadingSpinner } from '@/components'
import { Box, Button, Link, Typography, useTheme } from '@mui/material'
import { TCampus } from '@/types'
import NearMeIcon from '@mui/icons-material/NearMe'
import MapIcon from '@mui/icons-material/Map'
export default function Home() {
  const { palette } = useTheme()
  const formHandler = useForm<{
    universityId: number
    campus: TCampus
  }>({
    shouldUnregister: true,
  })

  const watchUniversityId = formHandler.watch('universityId')
  const watchCampusId = formHandler.watch('campus')

  const { data: universities, isLoading: isLoadingUniversities } = useQuery(
    ['universities'],
    () => getUniversityFilter()
  )

  const { data: campuses, isLoading: isLoadingCampuses } = useQuery(
    ['campus'],
    () => getCampus(),
    {
      enabled: !!watchUniversityId,
    }
  )

  if (isLoadingUniversities) return <LoadingSpinner />

  console.log(watchCampusId)

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
              id="universityId"
              label="Selecione uma Universidade"
              gridProps={{
                xs: 8,
              }}
              values={
                !universities
                  ? []
                  : universities.map((campus: any) => ({
                      value: campus.id,
                      label: campus.name,
                    }))
              }
            />
            <Form.SelectInput
              id="campus"
              label="Campus"
              gridProps={{
                xs: 4,
              }}
              values={
                !campuses
                  ? []
                  : campuses.map((campus: any) => ({
                      value: campus,
                      label: campus.name,
                    }))
              }
              selectProps={{
                disabled: !watchUniversityId,
                value: watchCampusId ? watchCampusId.name : undefined,
              }}
            />
          </Form>
          {watchCampusId && (
            <>
              <Button
                component={Link}
                href={`/map/${watchCampusId.position[0].latitude as any}/${
                  watchCampusId.position[0].longitude
                }`}
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
            component={Link}
            href="/login"
            width={1}
            sx={{
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
