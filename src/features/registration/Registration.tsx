import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'
import { ErrorSignUpResponse, useSignUpMutation } from '@/services/auth-service'
import { Navigate } from 'react-router-dom'
import { CreateAccountFields } from '@/schemes/types'
import { Icon } from '@/components/ui/icon'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/services/store.ts'
import s1 from '@/features/personal-page/PersonalPage.module.scss'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import { setErrorMessage } from '@/services/auth-service/auth-slice.ts'
import { AlertBar } from '@/components/ui/errorBar'

export const Registration = () => {
  const [signUp, { isSuccess, isLoading, isError, error }] = useSignUpMutation()

  const dispatch = useDispatch<AppDispatch>()

  const requestHandler = (data: CreateAccountFields) => {
    const { email, password, name } = data

    signUp({ email, password, name })
  }

  if (isError) {
    const errorResponse = error as ErrorSignUpResponse
    const message = errorResponse.data.errorMessages[0] || 'Unknown error'

    dispatch(setErrorMessage(message))
  }

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <SignUp onSubmit={requestHandler} />
      <AlertBar />
    </>
  )
}
