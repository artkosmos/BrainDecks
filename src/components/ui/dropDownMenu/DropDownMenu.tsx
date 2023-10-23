import { ComponentPropsWithoutRef, ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import s from './DropDownMenu.module.scss'

export type Props = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root> &
  ComponentPropsWithoutRef<typeof DropdownMenu.Content> &
  ComponentPropsWithoutRef<typeof DropdownMenu.Portal>

export const DropDownMenu = (props: Props) => {
  const { open, onOpenChange, container, children, trigger, className, ...rest } = props

  const contentClassName = clsx(s.dropDownContent, className)

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange} {...rest}>
      <DropdownMenu.Trigger asChild>
        <button className={s.triggerButton}>{trigger}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          className={contentClassName}
          align={'end'}
          sideOffset={15}
          alignOffset={-14}
          {...rest}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
