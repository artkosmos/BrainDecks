import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropDownMenu.module.scss'

export type DropDownMenuPropsType = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  sideOffset?: number
  children?: ReactNode
  className?: string
  container?: HTMLElement | null
}

export const DropDownMenu = (props: DropDownMenuPropsType) => {
  const { open, onOpenChange, sideOffset = 2, children, className, container } = props

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          className={className}
          sideOffset={sideOffset}
          align={'end'}
          alignOffset={20}
          avoidCollisions
        >
          {children}
          <DropdownMenu.Arrow className={s.dropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
