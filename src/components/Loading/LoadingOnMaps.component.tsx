/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from 'react'
import { Box, BoxProps } from '@mui/material'
import LogoAzul from '@/assets/UenpLogo.png'
import LogoBranca from '@/assets/logo2Equipe.png'
import Image from 'next/image'

type TProps = {
  color: 'white' | 'blue'
  height?: number
  boxProps?: BoxProps
  containerProps?: BoxProps
  imgStyle?: CSSProperties
}

export const LoadingOnMaps = ({
  boxProps,
  containerProps,
  imgStyle,
  color = 'blue',
  height = 50,
}: TProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
        width: 1,
      }}
      {...boxProps}
    >
      {color === 'white' ? (
        <Box className="onmaps-loading-white" {...containerProps}>
          <img
            src={LogoBranca.src}
            alt="OnMaps"
            style={{
              height: `${height}px`,
              ...imgStyle,
            }}
          />
        </Box>
      ) : (
        <Box className="onmaps-loading-blue" {...containerProps}>
          <img
            src={LogoAzul.src}
            alt="OnMaps"
            style={{
              height: `${height}px`,
              ...imgStyle,
            }}
          />
        </Box>
      )}
    </Box>
  )
}
