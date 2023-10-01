import { useRef, useState } from 'react'
import { faArrowRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import cardsLogo from '@/images/cardsLogo.png'
import s from './personalInfo.module.scss'

export const PersonalInformation = () => {
  const [edit, setEdit] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setEdit(!edit)
  }

  const editIconHandler = () => {
    console.log('handler')
  }

  return (
    <Card className={s.container}>
      <Typography variant={'h1'} className={s.typoInfo}>
        Personal Information
      </Typography>
      <div>
        <img className={s.userPhoto} src={cardsLogo} alt="user-photo" />
        <span className={s.editLogo}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={editIconHandler}
            style={{ cursor: 'pointer' }}
          />
        </span>
      </div>
      {edit ? (
        <Input name={'Nick name'} autoFocus={true} onBlur={() => setEdit(false)} />
      ) : (
        <div onDoubleClick={handleButtonClick}>
          name
          <span className={s.editIcon}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </div>
      )}

      <div className={s.email}>email</div>
      {edit ? (
        <Button className={s.button} variant={'primary'} fullWidth={true}>
          <>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </>
          <Typography variant={'subtitle2'}>Save Changes</Typography>
        </Button>
      ) : (
        <Button className={s.button} variant={'secondary'} fullWidth={true}>
          <>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </>
          {/*<NavLink to='logout'>*/}
          <Typography variant={'subtitle2'}>Logout</Typography>
          {/*</NavLink>*/}
        </Button>
      )}
    </Card>
  )
}
