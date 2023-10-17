import { Table } from '@/components/ui/tables'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import { CardsModals } from '@/types/common'
import { Card } from '@/services/card-service'
import { SortTableHeader } from '@/components/ui/tables/SortTableHeader'
import { Column } from '@/features/deck-pack'
import { Sort } from '@/services/deck-service'
import editIcon from '@/assets/icons/edit_icon.svg'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { Icon } from '@/components/ui/icon'
import s from './CardsTable.module.scss'

type Props = {
  onIconClick: (value: CardsModals | null, item: Card) => void
  data: Card[]
  sort?: Sort
  setSort?: (value: any) => void
  className?: string
}

export const CardsTable = (props: Props) => {
  const { data, sort, setSort, onIconClick, className } = props

  const columns: Column[] = [
    {
      key: 'question',
      title: 'Question',
    },
    {
      key: 'answer',
      title: 'Answer',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'grade',
      title: 'Grade',
    },
    {
      key: '',
      title: '',
    },
  ]

  return (
    <Table className={className}>
      <SortTableHeader columns={columns} sort={sort} onSort={setSort} />

      <TableBody>
        {data.map(item => {
          return (
            <TableRow key={item.id}>
              <TableCell>{item.question}</TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell>{new Date(item.updated).toLocaleDateString()}</TableCell>
              <TableCell>{item.grade}</TableCell>
              <TableCell className={s.actions}>
                <Icon
                  className={s.icon}
                  srcIcon={deleteIcon}
                  alt={'delete'}
                  onClick={() => onIconClick(CardsModals.DELETE, item)}
                />
                <Icon
                  className={s.icon}
                  srcIcon={editIcon}
                  onClick={() => onIconClick(CardsModals.UPDATE, item)}
                  alt={'edit'}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
