import { ForgotPasswordForm } from '@/components/auth/forgot-pasword-form'
import { useRecoverPasswordMutation } from '@/services/auth-service'
import { ForgotPasswordFields } from '@/types/common'
import { Navigate, useSearchParams } from 'react-router-dom'

export const RecoverPassword = () => {
  const [recoverPassword, result] = useRecoverPasswordMutation()

  const { isSuccess, isLoading } = result

  let [searchParams, setSearchParams] = useSearchParams()

  const requestHandler = (data: ForgotPasswordFields) => {
    const html =
      '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/reset-password/##token##">here</a> to recover your password</p>'

    recoverPassword({ email: data.email, html })
    setSearchParams({ email: data.email })
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (isSuccess) {
    return <Navigate to={'/check-email'} state={{ email: searchParams.get('email') }} />
  }

  return <ForgotPasswordForm onSubmit={requestHandler} />
}
