import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Input } from '@/components/ui/input'

type ControlledInputType = {
  name: string
}

type ControlledInputPropsType<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  ControlledInputType

const ControlledInput = <TFieldValues extends FieldValues>({
  name,
  control,
  ...inputProps
}: ControlledInputPropsType<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  return <Input value={value} onChange={onChange} name={name} />
}

export default ControlledInput
