import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Card.module.scss'

type Props = {
  height?: string
  children?: ReactNode
  classNameCard?: string
  classNameContent?: string
}
export const Card = (props: Props) => {
  const { children, classNameCard, classNameContent } = props

  const finalCardClassName = clsx(s.card, classNameCard && classNameCard)

  const finalContentClassName = clsx(s.content, classNameContent && classNameContent)

  return (
    <div className={finalCardClassName}>
      <div className={finalContentClassName}>{children}</div>
    </div>
  )
}
