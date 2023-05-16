import React, { createElement } from 'react'
import Link from 'next/link'
import { DataEquipaments, DataMapCategories } from '@/data'
import Image from 'next/image'
import { characterLimit } from '@/utils/functions'
import {
  Box,
  Grid,
  CardMedia,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material'
import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { AiFillStar, AiOutlineRight } from 'react-icons/ai'
import { TPlace } from '@/types'
import { grey } from '@mui/material/colors'

type TProps = {
  place: TPlace
}

export function PlaceCardSearch({ place }: TProps) {
  const icon =
    DataMapCategories.find((item) => item.value === place.category)?.icon ||
    AiFillStar

  if (!place) {
    return <div></div>
  }

  return (
    <>
      <Link
        href={`/place/${place.id}`}
        style={{
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Card sx={styles.container}>
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Typography
              component="div"
              variant="h4"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              {createElement(icon, {
                size: 20,
                style: { marginRight: 6 },
              })}
              {place.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {characterLimit(place.description, 120)}
              </Grid>
              <Grid item xs={12} sm={4} sx={styles.capitalized}>
                Tipo: {place.category}
              </Grid>
              <Grid item xs={12} sm={4}>
                Piso: {place.floor}
              </Grid>
              <Grid item xs={12} sm={4}>
                Bloco: {place.building}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Box sx={styles.containerEquipments}>
                  {DataEquipaments.filter((item) =>
                    place.equipment.includes(item.value)
                  )
                    .slice(0, 3)
                    .map((item, _index) => {
                      return (
                        <>
                          <Box key={item.value} sx={styles.cardEquipment}>
                            {createElement(item.icon, {
                              sx: {
                                fontSize: 18,
                              },
                            })}
                            {item.title}
                          </Box>
                          {_index === 2 && place.equipment.length > 3 && '...'}
                        </>
                      )
                    })}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 151,
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
            image={place.image[0].url}
            alt={place.name}
          />
        </Card>
      </Link>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f7f7f7',
    transition: 'all 0.3s ease',
    borderWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'solid',
    '&:hover': {
      backgroundColor: '#ffffff',
      borderWidth: 2,
      borderColor: 'primary.main',
      borderStyle: 'solid',
    },
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardListContainerDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    backgroundColor: 'white',
    mb: 4,
    p: 0,
    borderRadius: 4,
    with: '100%',
  },
  cardListStyle: {
    ...flexCenterContent,
    gap: 4,
  },
  cardListDetailsStyle: {
    dispaly: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 4,
    overflow: 'hidden',
    width: 60,
    height: 80,
  },
  containerEquipments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  cardEquipment: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'secondary.main',
    gap: 1,
    fontSize: 12,
    boxShadow: 1,
    px: 1,
    py: 0.2,
    borderRadius: 2,
    whiteSpace: 'nowrap',
  },
}
