import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import s from './signUp.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { Typography } from '@/components/ui/typography'

export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>()

  type FormValues = {
    email: string
    password: string
    confirmPassword: string
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div>
      <Card className={s.container}>
        <div>
          <Typography variant={'h1'} color={'light'} className={s.signTypography}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DevTool control={control} />
            <ControlledInput name={'email'} control={control} label={'Email'} />
            <ControlledInput name={'password'} control={control} label={'Password'} />
            <ControlledInput
              name={'confirmPassword'}
              placeholder={'confirm password'}
              control={control}
              label={'Confirm password'}
            />
            <Button type="submit" fullWidth={true} className={s.button}>
              Sign Up
            </Button>
            <div className={s.signInContainer}>
              <div className={s.question}>Already have an account?</div>
              {/*<NavLink to="/register" className={s.registerLink}>*/}
              {/*</NavLink>*/}

              <Button variant={'link'}>
                <Typography className={s.loginLink} variant={'subtitle2'}>
                  Sign In
                </Typography>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
