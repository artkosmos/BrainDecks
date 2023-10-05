import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import s from './Modal.module.scss'

export type ModalProps = ComponentPropsWithoutRef<typeof Dialog.Root> &
  ComponentPropsWithoutRef<typeof Dialog.Content>

export const Modal = forwardRef<ElementRef<typeof Dialog.Content>, ModalProps>((props, ref) => {
  const { children, className, title, ...rest } = props

  const contentClassName = clsx(s.content, className)

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content ref={ref} className={contentClassName} {...rest}>
          {children}
          <Dialog.Close className={s.closeBtn} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
