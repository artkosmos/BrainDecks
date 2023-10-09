import { Column } from '@/types/common'
import { Sort } from '@/types/api'
import { ComponentPropsWithoutRef } from 'react'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'

type Props = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    sort?: Sort
    onSort?: (sort: Sort) => void
  },
  'children'
>

export const SortTableHeader = ({ columns, sort, onSort, ...restProps }: Props) => {
  const sortHandler = (key: string) => () => {
    if (!onSort || !key) return

    if (sort?.key !== key) {
      return onSort({ key, direction: 'asc' })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ title, key }) => (
          <TableHeadCell key={key} onClick={sortHandler(key)}>
            {title}
            {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
