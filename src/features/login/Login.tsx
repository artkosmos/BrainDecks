import { LoginForm } from '@/components/auth/login-form'
import { ErrorLogInResponse, useLogInMutation, useMeQuery } from '@/services/auth-service'
import { Navigate } from 'react-router-dom'
import { Icon } from '@/components/ui/icon'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/services/store.ts'
import { setErrorMessage } from '@/services/auth-service/auth-slice.ts'
import { AlertBar } from '@/components/ui/errorBar'
import s1 from '@/features/personal-page/PersonalPage.module.scss'

export const Login = () => {
  const { isError, isLoading, isFetching } = useMeQuery()
  const [logIn, { isError: isLoginError, error }] = useLogInMutation()

  const dispatch = useDispatch<AppDispatch>()

  if (isLoading || isFetching) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  if (isLoginError) {
    const errorResponse = error as ErrorLogInResponse
    const message = errorResponse.data.message || 'Unknown error :('

    if (message === 'Invalid credentials') {
      dispatch(setErrorMessage('User is not found'))
    } else {
      dispatch(setErrorMessage(message))
    }
  }

  const isAuthorized = !isError

  if (isAuthorized) {
    return <Navigate to={'/'} replace={true} />
  }

  return (
    <>
      <LoginForm onSubmit={logIn} />
      <AlertBar />
    </>
  )
}
