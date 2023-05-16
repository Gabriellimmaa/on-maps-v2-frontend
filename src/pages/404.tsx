import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { flexCenterContent } from '@/utils/cssInJsBlocks'

export default function Custom404() {
  return (
    <Box sx={styles.container}>
      <Image src="/programmer.svg" alt="Login" width={300} height={140} />
      <Box>
        <Typography variant="h4" color="#183883">
          Desculpe, mas ainda não mapeamos essa área!
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Tome um café e volte à navegação ☕
        </Typography>
      </Box>
      <Button sx={styles.button}>
        <Link href="/">Voltar</Link>
      </Button>
    </Box>
  )
}
const styles = {
  container: {
    ...flexCenterContent,
    width: 1,
    height: '100vh',
    flexDirection: 'column',
    gap: 3,
    '& .MuiTypography-root': {
      textAlign: 'center',
      fontWeight: 'bold',
    },
  },
  button: {
    bgcolor: '#183883',
    color: '#ffffff',
    fontWeight: 'bold',
    display: 'flex',
    width: 1,
    maxWidth: 300,
    '&:hover': {
      bgcolor: '#2f4c8f',
    },
  },
}
