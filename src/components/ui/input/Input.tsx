import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './Input.module.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type AdditionalTypeToInput = {
  leftSideIcon?: JSX.Element
  rightSideIcon?: JSX.Element
  errorMessage?: string
  label?: string
  value?: string
  name?: string
  setShowPassword?: (value: boolean) => void
  showPassword?: boolean
}

export type InputPropsType = ComponentPropsWithoutRef<'input'> & AdditionalTypeToInput

export const Input = (props: InputPropsType) => {
  let {
    name,
    label,
    errorMessage,
    leftSideIcon,
    rightSideIcon,
    disabled,
    value,
    onChange,
    className,
    setShowPassword,
    showPassword,
    ...rest
  } = props

  const showPasswordHandler = () => {
    setShowPassword?.(!showPassword)
  }

  const finalClassName = clsx(s.input, errorMessage && s.errorInput, className && className)

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
          className={finalClassName}
          {...rest}
        />
        {rightSideIcon && (
          <span className={s.rightSideIcon} onClick={showPasswordHandler}>
            {rightSideIcon}
          </span>
        )}
        {errorMessage !== '' && <div className={s.error}>{errorMessage}</div>}
      </div>
    </div>
  )
}
