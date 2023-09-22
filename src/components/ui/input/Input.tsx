import { ComponentPropsWithoutRef } from 'react'

import s from './Input.module.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type AdditionalTypeToInput = {
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
}

type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = (props: InputPropsType) => {
  let { leftSideIcon, rightSideIcon, disabled, value, onChange } = props

  return (
    <div className={leftSideIcon ? s.inputIcon : s.defaultInputWithoutIcon}>
      {leftSideIcon && <span className={s.searchIcon}>{leftSideIcon}</span>}
      <input
        type="text"
        placeholder={'Input'}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={s.input}
      />
      {rightSideIcon && <span className={s.rightSideIcon}>{rightSideIcon}</span>}
    </div>
  )
}
