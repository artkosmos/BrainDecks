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
  typographyColor: any
  typographyStyle: any
}

export const RadioGroup = (
  props: Props & Omit<ComponentPropsWithoutRef<typeof Radio.Root>, keyof Props>
) => {
  const { color, className, options, onClick, ...rest } = props

  return (
    <Radio.Root className={style.root} {...rest}>
      {options.map((item, index) => (
        <Label key={index} className={style.label}>
          <Typography variant={'body2'} color={'light'}>
            {item.label}
          </Typography>
          <Radio.Item value={item.value} className={style.item}>
            <Radio.Indicator className={style.indicator} />
          </Radio.Item>
        </Label>
      ))}
    </Radio.Root>
  )
}
