import { ComponentPropsWithoutRef } from 'react'

import { Label } from '@radix-ui/react-label'
import * as Radio from '@radix-ui/react-radio-group'

import s from './RadioGroup.module.scss'

import { Typography } from '@/components/ui/typography'

type Options = {
  label: string
  value: string
}

export type RadioGroupProps = {
  options: Options[]
} & ComponentPropsWithoutRef<typeof Radio.Root>

export const RadioGroup = (props: RadioGroupProps) => {
  const { disabled, className, options, onValueChange, defaultValue, ...rest } = props

  return (
    <Radio.Root
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className={s.root}
      disabled={disabled}
      {...rest}
    >
      {options.map((item, index) => (
        <Label key={index} className={s.label}>
          <Typography variant={'body2'} className={!disabled ? s.textColor : s.disabledTextColor}>
            {item.label}
          </Typography>
          <div className={s.radioItemWrapper}>
            <Radio.Item value={item.value} className={s.item}>
              <Radio.Indicator className={s.indicator} />
            </Radio.Item>
          </div>
        </Label>
      ))}
    </Radio.Root>
  )
}
