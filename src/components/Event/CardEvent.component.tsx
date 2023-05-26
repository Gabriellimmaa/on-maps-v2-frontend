import { TEvent } from '@/types'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const CardEvent = ({ item }: { item: TEvent }) => {
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.subContainer}>
        <Box sx={styles.imageContainer}>
          <Image
            src={item.image[0].url}
            alt={item.name}
            width={350}
            height={150}
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={styles.subDetailContainer}>
          <Typography variant="h5">{item.name}</Typography>
          <Typography variant="body1">
            {new Date(item.date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              minute: '2-digit',
              hour: '2-digit',
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
      transition: 'all 0.2s ease-in-out',
    },
  },
  subContainer: {
    borderRadius: 4,
    width: 1,
  },
  imageContainer: {
    width: 1,

    overflow: 'hidden',
    borderRadius: 4,
  },
  subDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    px: 2,
  },
}
