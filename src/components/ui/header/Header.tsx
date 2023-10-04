import headerLogo from '@/assets/icons/cardsLogo.png'
import s from './header.module.scss'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type HeaderPropsType = {
  isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <img
          aria-label={'logo of application, tap to move to packs page'}
          src={headerLogo}
          className={s.logo}
          alt="app_logo"
        />
        <label className={s.userContainer}>
          {isAuth ? (
            // add aria label
            <>
              <span style={{ borderBottom: '1px dashed #fff' }}>user</span>
              <img src={headerLogo} className={s.logo} alt="users_photo" />
            </>
          ) : (
            <Button aria-label={'login button'}>
              <Typography>Sign In</Typography>
            </Button>
          )}
        </label>
      </div>
    </header>
  )
}
