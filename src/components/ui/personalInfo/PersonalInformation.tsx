import { faArrowRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from './personalInfo.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import cardsLogo from '@/images/cardsLogo.png'

export const PersonalInformation = () => {
  return (
    <div>
      <Card className={s.container}>
        <Typography variant={'h2'}>Personal Information</Typography>
        <div>
          <img className={s.userPhoto} src={cardsLogo} alt="user-photo" />
          <span className={s.editLogo}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </div>
        <div>
          name
          <span className={s.editIcon}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </div>
        <div className={s.email}>email</div>
        <Button className={s.button} variant={'secondary'}>
          <>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </>
          <Typography variant={'subtitle2'}>Logout</Typography>
        </Button>
      </Card>
    </div>
  )
}
