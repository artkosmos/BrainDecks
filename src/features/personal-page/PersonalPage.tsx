import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'
import { useLogOutMutation, useMeQuery, useUpdateProfileMutation } from '@/services/auth-service'
import { UpdatePersonalInfoFields } from '@/features/personal-page/types'

export const PersonalPage = () => {
  const { data, isLoading } = useMeQuery()
  const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateProfileMutation()
  const [logOut] = useLogOutMutation()

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA RECEIVED</div>
  }

  const updateProfileHandler = (data: UpdatePersonalInfoFields) => {
    updateProfile(data)
  }

  return (
    <PersonalInformation
      isLoading={isUpdateLoading}
      userData={data}
      logOutFn={logOut}
      onSubmit={updateProfileHandler}
    />
  )
}
