import { Box, BoxProps, CircularProgress, useTheme } from '@mui/material'
import { CSSProperties } from 'react'

type TProps = {
  boxProps?: BoxProps
  spinnerStyle?: CSSProperties
}

export const LoadingSpinner = ({ boxProps, spinnerStyle }: TProps) => {
  const { palette } = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
      }}
      {...boxProps}
    >
      <CircularProgress
        style={{
          color: palette.primary.main,
          ...spinnerStyle,
        }}
      />
    </Box>
  )
}
