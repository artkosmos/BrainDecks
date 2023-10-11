import { SignUp } from '@/components/auth/sign-up/SignUp.tsx'
import { useSignUpMutation } from '@/services/auth-service'

export const Registration = () => {
  const [signUp] = useSignUpMutation()

  return <SignUp onSubmit={signUp} />
}
