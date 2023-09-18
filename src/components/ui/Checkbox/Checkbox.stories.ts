import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/components/ui/Checkbox/Checkbox.tsx'

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
