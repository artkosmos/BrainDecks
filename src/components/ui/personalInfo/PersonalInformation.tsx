import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdatePersonalInfo } from '@/features/personal-page/types'
import { updatePersonalInfoSchema } from '@/schemes/updatePersonalInfoSchema.ts'
import { GetMeQueryResponseData } from '@/services/auth-service'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Icon } from '@/components/ui/icon'
import userIcon from '@/assets/icons/unknown.svg'
import { SignOutIcon } from '@/assets/icons/components/SignOutIcon.tsx'
import { EditIcon } from '@/assets/icons/components/EditIcon.tsx'
import { CancelIcon } from '@/assets/icons/components/CancelIcon.tsx'
import { ControlledFileInput } from '@/components/ui/controlled/controlledFileInput'
import s from './PersonalInfo.module.scss'

type Props = {
  onSubmit?: any
  userData: GetMeQueryResponseData | undefined
}

export const PersonalInformation = ({ onSubmit, userData }: Props) => {
  const [editName, setEditName] = useState<boolean>(false)
  const [editEmail, setEditEmail] = useState<boolean>(false)
  const [editAvatar, setEditAvatar] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePersonalInfo>({
    resolver: zodResolver(updatePersonalInfoSchema),
    mode: 'onSubmit',
    defaultValues: { email: userData?.email, avatar: userData?.avatar, name: userData?.name },
  })

  const onSubmitHandler = handleSubmit(data => {
    console.log(data)
    onSubmit?.(data)
  })

  return (
    <Card className={s.container} aria-label={'profile information'}>
      <Typography variant={'h1'}>Personal Information</Typography>
      <form onSubmit={onSubmitHandler} className={s.form}>
        {editAvatar ? (
          <div className={`${s.editWrapper} ${s.editAvatarWrapper}`}>
            <ControlledFileInput
              control={control}
              name={'avatar'}
              id={'avatar'}
              buttonText={'Choose New Photo'}
            />
            <CancelIcon className={s.cancelIcon} onClick={() => setEditAvatar(false)} />
          </div>
        ) : (
          <div className={s.avatarWrapper}>
            <Icon className={s.avatar} srcIcon={userIcon} alt={'avatar'} />
            <Button
              variant={'secondary'}
              className={s.avatarEditButton}
              onClick={() => setEditAvatar(true)}
            >
              <EditIcon width={16} />
            </Button>
          </div>
        )}

        {editName ? (
          <div className={s.editWrapper}>
            <ControlledInput
              autoFocus
              control={control}
              name={'name'}
              errorMessage={errors.name?.message}
              label={'Nick Name'}
            />
            <CancelIcon className={s.cancelIcon} onClick={() => setEditName(false)} />
          </div>
        ) : (
          <div className={s.notEditWrapper}>
            <Typography variant={'h1'}>{userData?.name}</Typography>
            <EditIcon width={16} className={s.editIcon} onClick={() => setEditName(true)} />
          </div>
        )}

        {editEmail ? (
          <div className={s.editWrapper}>
            <ControlledInput
              autoFocus
              control={control}
              name={'email'}
              errorMessage={errors.email?.message}
              label={'Email'}
            />
            <CancelIcon className={s.cancelIcon} onClick={() => setEditEmail(false)} />
          </div>
        ) : (
          <div className={s.notEditWrapper}>
            <Typography className={s.email} variant={'body2'}>
              {userData?.email}
            </Typography>
            <EditIcon width={16} className={s.editIcon} onClick={() => setEditEmail(true)} />
          </div>
        )}

        {(editName || editEmail) && (
          <Button
            type={'submit'}
            className={s.submitButton}
            aria-label={'save changes'}
            variant={'primary'}
            fullWidth={true}
          >
            <Typography variant={'subtitle2'}>Save Changes</Typography>
          </Button>
        )}

        {!editName && !editEmail && (
          <Button
            type={'button'}
            aria-label={'logout'}
            className={s.button}
            variant={'secondary'}
            fullWidth={true}
          >
            <SignOutIcon />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        )}
      </form>
    </Card>
  )
}
