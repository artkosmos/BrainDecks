import Snackbar from '@mui/material/Snackbar'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/services/store.ts'
import { getErrorMessage } from '@/selectors'
import { SyntheticEvent } from 'react'
import { setErrorMessage } from '@/services/auth-service/auth-slice.ts'
import Alert from '@mui/material/Alert'
import s from './AlertBar.module.scss'

type Props = {
  alertType?: 'error' | 'success' | 'warning'
}

export function AlertBar({ alertType = 'error' }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const error = useAppSelector(getErrorMessage)

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setErrorMessage(null))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        className={s.alert}
        variant={'outlined'}
        onClose={handleClose}
        severity={alertType}
        data-severity={alertType}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}
