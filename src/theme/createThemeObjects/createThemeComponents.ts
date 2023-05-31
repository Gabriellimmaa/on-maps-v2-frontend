import { grey } from '@mui/material/colors'
import { Components, Theme } from '@mui/material'

export const createThemeComponents = (): Components<Theme> => {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          height: '78px',
          width: '100%',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          height: 40,
          paddingInline: 40,
          paddingBlock: 0,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          display: 'inline-table',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: '#E5E7EB',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E5E7EB',
          '& .MuiTypography-body1': {
            color: '#3c454d',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
        },
        head: {
          color: '#183883',
          fontWeight: 'bold',
        },
        body: {
          color: '#2f4c8f',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#183883',
        },
        h2: {
          color: '#183883',
        },
        h3: {
          color: '#183883',
        },
        h4: {
          color: '#183883',
          fontWeight: 'bold',
          fontSize: '1.3rem',
        },
        h5: {
          color: '#183883',
          fontWeight: 'bold',
          fontSize: '1rem',
        },
        h6: {
          color: '#183883',
          fontSize: '1rem',
        },
        body1: {
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: grey[500],
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '2rem',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          color: grey[500],
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        rowsPerPageOptions: [5, 10, 25],
        component: 'div',
      } as any,
    },
  }
}
