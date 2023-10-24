import letter from '@/assets/icons/check_email.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { Link, useLocation } from 'react-router-dom'
import s from './CheckEmailCard.module.scss'

export const CheckEmailCard = () => {
  const location = useLocation()

  return (
    <Card
      className={s.emailCard}
      aria-label={'Checking email address for access to the registration'}
    >
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <Icon srcIcon={letter} />
      <Typography className={s.subtitle} variant={'body2'}>
        We’ve sent an Email with instructions to {location.state.email}
      </Typography>
      <Button
        as={Link}
        to={'/login'}
        className={s.button}
        variant={'primary'}
        fullWidth={true}
        aria-label={'back to sign in button'}
      >
        <Typography variant={'subtitle2'}>Back to Sign In</Typography>
      </Button>
    </Card>
  )
}
