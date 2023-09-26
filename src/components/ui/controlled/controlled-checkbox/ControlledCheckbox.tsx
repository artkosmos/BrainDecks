import { useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type Props = UseControllerProps<any> & CheckboxProps

export const ControlledCheckbox = (props: Props) => {
  const { control, name, defaultValue, ...rest } = props

  const {
    field: { onChange, value },
  } = useController({ name, control })

  return <Checkbox onCheckedChange={onChange} checked={value} id={name} {...rest} />
}
