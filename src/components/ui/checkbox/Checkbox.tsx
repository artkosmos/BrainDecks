import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'

import s from './Checkbox.module.scss'

import { CheckedIcon } from '@/components/ui/checkbox'
import { Typography } from '@/components/ui/typography'

export type CheckboxProps = {
  label?: string
  onCheckedChange?: (checked: boolean) => void
} & Omit<ComponentPropsWithoutRef<typeof CheckboxRadix.Root>, 'onCheckedChange'>

export const Checkbox = (props: CheckboxProps) => {
  const { checked, disabled, label, onChange, onCheckedChange, ...rest } = props

  return (
    <Label.Root className={s.label}>
      <Typography variant={'body2'} className={!disabled ? s.textColor : s.disabledTextColor}>
        {label}
      </Typography>
      <div className={s.checkboxWrapper}>
        <CheckboxRadix.Root
          className={s.root}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          {...rest}
        >
          <CheckboxRadix.Indicator className={s.indicator}>
            {checked && <CheckedIcon />}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
    </Label.Root>
  )
}
