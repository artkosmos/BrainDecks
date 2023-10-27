import { LoginForm } from '@/components/auth/login-form'
import { useLogInMutation, useMeQuery } from '@/services/auth-service'
import { Navigate } from 'react-router-dom'
import { Icon } from '@/components/ui/icon'
import s1 from '@/features/personal-page/PersonalPage.module.scss'
import gearIcon from '@/assets/icons/gear_preloader.svg'

export const Login = () => {
  const { isError, isLoading } = useMeQuery()
  const [logIn] = useLogInMutation()

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  const isAuthorized = !isError

  if (isAuthorized) {
    return <Navigate to={'/'} replace={true} />
  }

  return <LoginForm onSubmit={logIn} />
}
