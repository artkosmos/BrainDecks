import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/components/ui/slider/Slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      description: 'Let you change direction of slider.',
    },
    max: {
      description: 'The maximum value for the range.',
    },
    min: {
      description: 'The minimum value for the range.',
    },
    defaultValue: {
      description:
        'Current location of the thumbs. If you wanna see the one thumb you should pass single value in array.',
    },
    step: {
      description: 'The stepping interval.',
    },
    minStepsBetweenThumbs: {
      description: 'The minimum step between two thumbs.',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const AdaptiveSlider: Story = {
  args: {
    min: 0,
    max: 15,
    defaultValue: [2, 10],
    step: 1,
    minStepsBetweenThumbs: 1,
    disabled: false,
    orientation: 'horizontal',
  },
}
