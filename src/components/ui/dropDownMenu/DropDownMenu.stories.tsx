import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { DropDownMenu } from './'
// import s from './DropDownMenu.stories.module.scss'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => <PreviewDropDown />,
}

const PreviewDropDown = () => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const onOpenChange = (open: boolean) => {
    setIsShow(open)
  }

  const options = ['PLAY', 'EDIT', 'DELETE']

  return <DropDownMenu open={isShow} onOpenChange={onOpenChange} dropDownOptions={options} />
}
