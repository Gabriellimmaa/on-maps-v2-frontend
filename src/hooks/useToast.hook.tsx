import { createContext, useContext, useState } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

type ToastContextData = {
  createToast(message: string, type?: AlertColor, duration?: number): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

type ToastProviderProps = {
  children: React.ReactNode
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [duration, setDuration] = useState(3000)

  const createToast = (
    message: string,
    severity: AlertColor,
    duration: number = 3000
  ) => {
    setMessage(message)
    setSeverity(severity)
    setDuration(duration)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
