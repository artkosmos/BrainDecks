import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Input, InputPropsType } from '@/components/ui/input'
import { ChangeEvent } from 'react'

type ControlledInputPropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputPropsType, 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  type,
  ...inputProps
}: ControlledInputPropsType<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      onChange(file)
    }
  }

  if (type === 'file') {
    return <Input type={type} onChange={uploadHandler} name={name} {...inputProps} />
  }

  return <Input type={type} value={value} onChange={onChange} name={name} {...inputProps} />
}
