import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'
import { useSignUpMutation } from '@/services/auth-service'
import { Navigate } from 'react-router-dom'
import { CreateAccountFields } from '@/schemes/types'
import { Icon } from '@/components/ui/icon'
import s1 from '@/features/personal-page/PersonalPage.module.scss'
import gearIcon from '@/assets/icons/gear_preloader.svg'

export const Registration = () => {
  const [signUp, result] = useSignUpMutation()

  const { isSuccess, isLoading } = result

  const requestHandler = (data: CreateAccountFields) => {
    const { email, password, name } = data

    signUp({ email, password, name })
  }

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }

  return <SignUp onSubmit={requestHandler} />
}
