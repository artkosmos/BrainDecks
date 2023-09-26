import { ComponentPropsWithoutRef } from 'react'

import s from './Input.module.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export type AdditionalTypeToInput = {
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
  errorMessage?: string
  label?: string
  value?: string
  name?: string
}

type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = (props: InputPropsType) => {
  let { name, label, errorMessage, leftSideIcon, rightSideIcon, disabled, value, onChange } = props

  return (
    <div>
      <div className={s.label}>{label}</div>
      <div className={leftSideIcon ? s.inputIcon : s.defaultInputWithoutIcon}>
        {leftSideIcon && <span className={s.searchIcon}>{leftSideIcon}</span>}
        <input
          type="text"
          placeholder={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={errorMessage ? s.errorInput : s.input}
        />
        {rightSideIcon && <span className={s.rightSideIcon}>{rightSideIcon}</span>}
        {errorMessage !== '' && <div className={s.error}>{errorMessage}</div>}
      </div>
    </div>
  )
}
