import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/stories/Checkbox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const AdaptiveCheckbox: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Checkbox',
  },
}
