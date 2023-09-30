import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './Icon.module.scss'

type Props = { srcIcon: string } & Omit<ComponentPropsWithoutRef<'img'>, 'src'>
export const Icon = ({ className, srcIcon, alt, ...rest }: Props) => {
  const finalClassName = clsx(s.icon, className)

  return <img src={srcIcon} className={finalClassName} alt={alt} {...rest} />
}
