import s from './PageNotFound.module.scss'

import image from '@/assets/404.png'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className={s.container}>
      <img src={image}></img>
      <Typography variant={'body1'} htmlTag={'h2'}>
        Sorry! Page not found!
      </Typography>
      <Button as={Link} to={'/'}>
        Back to home page
      </Button>
    </div>
  )
}
