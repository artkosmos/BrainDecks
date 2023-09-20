import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '@/components/ui/radioGroup'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Radio: Story = {
  args: {
    checked: true,
  },
}
