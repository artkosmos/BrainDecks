// import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'
import { LoginForm } from '@/components/auth/login-form/LoginForm.tsx'
// import { Input } from '@/components/ui/input'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vh',
        height: '100vh',
      }}
    >
      <LoginForm />
    </div>
  )
}
