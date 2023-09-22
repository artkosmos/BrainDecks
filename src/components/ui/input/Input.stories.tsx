import { ChangeEvent, useState } from 'react'

import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const DisabledInput: Story = {
  args: {
    disabled: true,
  },
}
export const DefaultInput = () => {
  const [inputValue, setInputValue] = useState<string>('')

  let onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    return setInputValue(e.currentTarget.value)
  }

  return <Input value={inputValue} onChange={onChangeInputValueHandler} />
}

const inputWithIcons = () => {
  let searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#ffffff' }} />
  let rightSideIcon = <FontAwesomeIcon icon={faXmark} style={{ color: '#ffffff' }} />

  // <FontAwesomeIcon icon={faEye} /> right side input icon eye
  // <FontAwesomeIcon icon={faEyeSlash} />  right side input icon eye locked

  return <Input leftSideIcon={searchIcon} rightSideIcon={rightSideIcon} />
}
const inputWithError = () => {
  let error = 'error'

  return <Input error={error} />
}
