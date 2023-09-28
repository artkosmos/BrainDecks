import { useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import { Button } from '../../ui/button'

// import { Checkbox } from '@/components/ui/checkbox'

import s from './loginForm.module.scss'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlledInput/ControlledInput.tsx'
import { Typography } from '@/components/ui/typography'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormValues>()

  const [checked, setChecked] = useState(false)
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
            <div className={s.checkBox}>
              <Checkbox
                label={'Remember Me'}
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
              />
            </div>
            <Typography variant={'caption'} className={s.forgotTypography} onClick={() => {}}>
              Forgot Password?
            </Typography>
            <Button type="submit" fullWidth={true} className={s.button}>
              Sign In
            </Button>
            <div className={s.signUpContainer}>
              <div className={s.question}>{`Don't have an account?`}</div>
              {/*<NavLink to="/register" className={s.registerLink}>*/}
              {/*</NavLink>*/}

              <Button variant={'link'}>
                <Typography className={s.registerLink} variant={'subtitle2'}>
                  Sign up
                </Typography>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
