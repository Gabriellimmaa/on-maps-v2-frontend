import { PaletteOptions } from '@mui/material'

export const createThemePalette = (): PaletteOptions => {
  return {
    primary: {
      main: '#183883',
      light: '#2f4c8f',
      dark: '#0f1f4f',
    },
    secondary: {
      main: '#F2F2F2',
      light: '#FFFFFF',
      dark: '#C9C9C9',
    },
    tertiary: {
      main: '#57636F',
      light: '#78828b',
      dark: '#3c454d',
      contrastText: '#F2F2F2',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
  }
}
