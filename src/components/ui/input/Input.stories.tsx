import type { Meta, StoryObj } from '@storybook/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Input } from './Input'
import { ChangeEvent, useState } from 'react'

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

// export const Primary: Story = {
//   args: {
//     // primary: true,
//     label: 'Input',
//   },
// }

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

export const inputWithIcons = () => {
  let searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#ffffff' }} />
  let rightSideIcon = <FontAwesomeIcon icon={faXmark} style={{ color: '#ffffff' }} />

  // <FontAwesomeIcon icon={faEye} /> rightside input icon
  // <FontAwesomeIcon icon={faEyeSlash} />  rightside input icon

  return <Input leftSideIcon={searchIcon} rightSideIcon={rightSideIcon} />
}
