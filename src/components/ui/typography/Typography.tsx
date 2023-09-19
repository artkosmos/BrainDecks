import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import style from './Typography.module.scss'

const ELEMENTS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  link1: 'a',
  link2: 'a',
  overline: 'p',
  large: 'div',
} as const

type Element = keyof typeof ELEMENTS

type Props<T extends ElementType> = {
  htmlTag?: T
  variant?: Element
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { className, htmlTag: Element = 'span', children, ...rest } = props

  return (
    <Element
      className={`${style.element} ${className ? style.className : ''}`}
      data-state={Element}
      {...rest}
    >
      {children}
    </Element>
  )
}
