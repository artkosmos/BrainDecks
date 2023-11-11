import appLogo from '@/assets/flash-card.png'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Icon } from '@/components/ui/icon'
import { GetMeQueryResponseData, useLogOutMutation } from '@/services/auth-service'
import { useNavigate } from 'react-router-dom'
import { DropDownMenu } from '@/components/ui/dropDownMenu'
import { DropDownItem } from '@/components/ui/dropDownMenu/dropDownItem'
import { PersonIcon } from '@/assets/icons/components/PersonIcon.tsx'
import { SignOutIcon } from '@/assets/icons/components/SignOutIcon.tsx'
import Switch from '@mui/material/Switch'
import userIcon from '@/assets/icons/unknown.svg'
import s from './Header.module.scss'
import s1 from '@/features/cards-pack/CardsPack.module.scss'
import { useI18N } from '@/hooks/useI18n.ts'

type HeaderPropsType = {
  isAuth: boolean
  userData?: GetMeQueryResponseData
}

export const Header = ({ isAuth, userData }: HeaderPropsType) => {
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()

  const { t, handleChangeLanguage } = useI18N()

  const dropDownTrigger = userData?.avatar ? (
    <Icon className={`${s.userAvatar} ${s.headerAvatar}`} srcIcon={userData.avatar} />
  ) : (
    <Icon width={46} srcIcon={userIcon} />
  )

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div onClick={() => navigate('/')} className={s.iconAndNameWrapper}>
          <Icon
            srcIcon={appLogo}
            className={s.logo}
            alt={'app_logo'}
            aria-label={'logo of application, tap to move to packs page'}
          />
          <Typography variant={'h1'}>BrainDecks</Typography>
        </div>
        <div>
          EN
          <Switch onChange={handleChangeLanguage} />
          RU
        </div>
        <label className={s.userContainer}>
          {isAuth ? (
            <>
              <span className={s.userName}>{userData?.name}</span>
              <DropDownMenu
                className={s.headerDropDown}
                alignOffset={-9}
                sideOffset={7}
                trigger={dropDownTrigger}
              >
                <DropDownItem>
                  <Icon
                    className={s.userAvatar}
                    srcIcon={userData?.avatar ? userData.avatar : userIcon}
                    alt={'user avatar'}
                  />
                  <div className={s.emailAndName}>
                    <Typography variant={'subtitle2'}>{userData?.name}</Typography>
                    <Typography className={s.email} variant={'caption'}>
                      {userData?.email}
                    </Typography>
                  </div>
                </DropDownItem>
                <DropDownItem onClick={() => navigate('/user')} className={s1.dropDownMenuItem}>
                  <PersonIcon />
                  My Profile
                </DropDownItem>
                <DropDownItem onClick={() => logOut()} className={s1.dropDownMenuItem}>
                  <SignOutIcon />
                  Sign Out
                </DropDownItem>
              </DropDownMenu>
            </>
          ) : (
            <Button onClick={() => navigate('/login')} aria-label={'login button'}>
              <Typography variant={'subtitle2'}>{t('logIn')}</Typography>
            </Button>
          )}
        </label>
      </div>
    </header>
  )
}
