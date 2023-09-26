import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import { Button } from '../../ui/button'

// import { Checkbox } from '@/components/ui/checkbox'
import ControlledInput from '@/components/ui/controlledInput/ControlledInput.tsx'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlledInput name={'email'} control={control} />
      <ControlledInput name={'password'} control={control} />
      {/*<Checkbox label={'checkBox'} />*/}
      <Button type="submit">Submit</Button>
    </form>
  )
}
