import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/ui/pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      description: 'Represents the current active page.',
    },
    totalCount: {
      description: 'Represents the total count of data available from the source.',
    },
    pageSize: {
      description: 'Represents the maximum data that is visible in a single page.',
    },
    siblingCount: {
      description:
        'Represents the min number of page buttons to be shown on each side of the current page button (default = 1)',
    },
    onChange: {
      description:
        'Callback function that invoked with the updated page value when the page is changed.',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const CustomPaginationWithState: Story = {
  render: () => <RenderPagination />,
}

const RenderPagination = () => {
  const [page, setPage] = useState<number>(1)

  const totalCount = 50
  const pageSize = 5

  return (
    <Pagination totalCount={totalCount} currentPage={page} pageSize={pageSize} onChange={setPage} />
  )
}
