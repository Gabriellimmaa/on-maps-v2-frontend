import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
import {
  createThemePalette,
  createThemeBreakpoints,
  createThemeComponents,
} from './createThemeObjects'

// Docs @ https://mui.com/material-ui/customization/theming/#api

export const createCustomTheme = () => {
  return createTheme(
    {
      breakpoints: createThemeBreakpoints(),
      palette: createThemePalette(),
      components: createThemeComponents(),
    },
    ptBR,
  )
}
