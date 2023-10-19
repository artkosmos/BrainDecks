import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'
import { createAccountSchema } from '@/schemes/createAccountSchema.ts'
import crossedEye from '@/assets/icons/eye_crossed.svg'
import eye from '@/assets/icons/eye.svg'
import { Icon } from '@/components/ui/icon'
import { CreateAccountFields } from '@/types/common'
import { Link } from 'react-router-dom'
import s from './SignUp.module.scss'

type Props = {
  onSubmit?: (values: CreateAccountFields) => void
}

export const SignUp = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAccountFields>({
    resolver: zodResolver(createAccountSchema),
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
  })

  const inputEyeIcon = showPassword ? <Icon srcIcon={crossedEye} /> : <Icon srcIcon={eye} />

  return (
    <Card aria-label={'registration form'} className={s.container}>
      <Typography variant={'h1'} className={s.title}>
        Sign Up
      </Typography>
      <form className={s.form} onSubmit={onSubmitHandler}>
        <ControlledInput
          aria-label={'enter your email'}
          name={'email'}
          control={control}
          label={'Email'}
          className={s.input}
          placeholder={'Enter your email'}
        />
        <div className={s.errorPlace}>
          <Typography className={s.error} variant={'body2'}>
            {errors?.email?.message}
          </Typography>
        </div>
        <ControlledInput
          aria-label={'enter your nick name'}
          name={'name'}
          control={control}
          label={'Nickname'}
          placeholder={'Enter desired nickname'}
        />
        <div className={s.errorPlace}>
          <Typography className={s.error} variant={'body2'}>
            {errors?.name?.message}
          </Typography>
        </div>
        <ControlledInput
          aria-label={'enter your password'}
          type={showPassword ? 'text' : 'password'}
          name={'password'}
          control={control}
          label={'Password'}
          placeholder={'Enter your password'}
          callBack={setShowPassword}
          callBackValue={showPassword}
          rightSideIcon={inputEyeIcon}
        />
        <div className={s.errorPlace}>
          <Typography className={s.error} variant={'body2'}>
            {errors?.password?.message}
          </Typography>
        </div>
        <ControlledInput
          aria-label={'confirm your password'}
          type={showPassword ? 'text' : 'password'}
          name={'confirmPassword'}
          placeholder={'Confirm your password'}
          control={control}
          label={'Confirm password'}
          callBack={setShowPassword}
          callBackValue={showPassword}
          rightSideIcon={inputEyeIcon}
        />
        <div className={s.errorPlace}>
          <Typography className={s.error} variant={'body2'}>
            {errors?.confirm?.message}
          </Typography>
        </div>
        <Typography variant={'caption'} className={s.prompt}>
          Password must be at least 8 characters and includes at least one digit, one letter and one
          special symbol
        </Typography>
        <Button
          aria-label={'commit registration'}
          type="submit"
          fullWidth={true}
          className={s.button}
        >
          <Typography variant={'subtitle2'}>Sign Up</Typography>
        </Button>
        <Typography className={s.question} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button
          as={Link}
          to={'/login'}
          type={'button'}
          aria-label={'back to login page'}
          variant={'link'}
          className={s.signInButton}
        >
          <Typography className={s.signInText} variant={'subtitle2'}>
            Sign In
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
