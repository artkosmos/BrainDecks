import { ComponentPropsWithoutRef } from 'react'

import { Label } from '@radix-ui/react-label'
import * as Radio from '@radix-ui/react-radio-group'

import style from './RadioGroup.module.scss'

import { Typography } from '@/components/ui/typography'

type Options = {
  label: string
  value: string
}

type Props = {
  options: Options[]
}

export const RadioGroup = (
  props: Props & Omit<ComponentPropsWithoutRef<typeof Radio.Root>, keyof Props>
) => {
  const { disabled, className, options, onValueChange, ...rest } = props

  return (
    <Radio.Root
      onValueChange={onValueChange}
      defaultValue={'none'}
      className={style.root}
      disabled={disabled}
      {...rest}
    >
      {options.map((item, index) => (
        <Label key={index} className={style.label}>
          <Typography variant={'body2'} color={!disabled ? 'light' : 'grey'}>
            {item.label}
          </Typography>
          <div className={style.radioItemWrapper}>
            <Radio.Item value={item.value} className={style.item}>
              <Radio.Indicator className={style.indicator} />
            </Radio.Item>
          </div>
        </Label>
      ))}
    </Radio.Root>
  )
}
