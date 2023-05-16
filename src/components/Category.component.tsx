import { DataMapCategories } from '@/data'
import { TMapCategories } from '@/types'
import { Box, Grid, Icon, Typography } from '@mui/material'
import { createElement } from 'react'

interface ICategoryProps {
  category: TMapCategories
}

export function Category({ category }: ICategoryProps) {
  // @todo
  const icon = DataMapCategories.find((item) => item.value === category)?.icon
  return (
    <Grid sx={styles.cardContainer}>
      <Box sx={styles.categoryCardStyle}>
        {/* {createElement(icon, { size: 20 })} */}
        <Typography variant="body2">{category}</Typography>
      </Box>
    </Grid>
  )
}

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
  categoryCardStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 1,
    borderRadius: 10,
    p: 1,
    backgroundColor: '#F5F5F5',
    gap: 1,
  },
}
