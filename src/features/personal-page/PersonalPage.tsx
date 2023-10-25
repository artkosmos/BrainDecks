import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'
import { useMeQuery } from '@/services/auth-service'

export const PersonalPage = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  return <PersonalInformation userData={data} />
}
