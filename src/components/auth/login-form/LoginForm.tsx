import { useState } from 'react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlledInput/ControlledInput.tsx'
import { Typography } from '@/components/ui/typography'
import { emailSchema } from '@/schemes'
import { Icon } from '@/components/ui/icon'
import crossedEye from '@/assets/icons/eye_crossed.svg'
import eye from '@/assets/icons/eye.svg'
import s from './loginForm.module.scss'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

type Props = {
  onSubmit: (values: FormValues) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [checked, setChecked] = useState(false)

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  const inputEyeIcon = showPassword ? <Icon srcIcon={crossedEye} /> : <Icon srcIcon={eye} />

  return (
    <div>
      <Card className={s.container} aria-label={'login form'}>
        <div>
          <Typography className={s.signTypography} variant={'h1'} color={'light'}>
            Sign In
          </Typography>
          <form onSubmit={onSubmitHandler}>
            <DevTool control={control} />
            <ControlledInput
              aria-label={'enter your email'}
              className={s.input}
              name={'email'}
              control={control}
              label={'Email'}
            />
            <Typography variant={'body2'} className={s.error}>
              {errors?.email?.message}
            </Typography>
            <ControlledInput
              aria-label={'enter your password'}
              className={s.input}
              type={showPassword ? 'text' : 'password'}
              name={'password'}
              control={control}
              label={'Password'}
              rightSideIcon={inputEyeIcon}
              callBack={setShowPassword}
              callBackValue={showPassword}
            />
            <div className={s.checkBox}>
              <Checkbox
                aria-label={'remember me'}
                label={'Remember Me'}
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
              />
            </div>
            <Typography
              aria-label={'if you forgot password - follow this link'}
              variant={'caption'}
              className={s.forgotTypography}
              onClick={() => {}}
            >
              Forgot Password?
            </Typography>
            <Button aria-label={'login button'} type="submit" fullWidth={true} className={s.button}>
              Sign In
            </Button>
            <div className={s.signUpContainer}>
              <div className={s.question}>{`Don't have an account?`}</div>
              {/*<NavLink to="/register" className={s.registerLink}>*/}
              {/*</NavLink>*/}

              <Button aria-label={'registration link'} variant={'link'}>
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
