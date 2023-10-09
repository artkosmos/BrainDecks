import { Table } from '@/components/ui/tables'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import { SortTableHeader } from '@/components/ui/tables/SortTableHeader'
import { Icon } from '@/components/ui/icon'
import playIcon from '@/assets/icons/play_icon.svg'
import editIcon from '@/assets/icons/edit_icon.svg'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { Column, DeckModals } from '@/types/common'
import { Deck, Sort } from '@/types/api'
import s from './DeckTable.module.scss'

type Props = {
  onIconClick: (value: DeckModals | null, item: Deck) => void
  className?: string
  data: Deck[]
  sort?: Sort
  setSort?: (value: any) => void
}

const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created by',
  },
  {
    key: '',
    title: '',
  },
]

export const DeckTable = (props: Props) => {
  const { data, className, onIconClick, sort, setSort } = props

  return (
    <Table className={className}>
      <SortTableHeader columns={columns} sort={sort} onSort={setSort} />
      <TableBody>
        {data.map(item => {
          return (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.cardsCount}</TableCell>
              <TableCell>{new Date(item.updated).toLocaleDateString()}</TableCell>
              <TableCell>{item.author.name}</TableCell>
              <TableCell className={s.iconsCell}>
                <Icon className={s.icon} srcIcon={playIcon} />
                <Icon
                  onClick={() => onIconClick(DeckModals.UPDATE, item)}
                  className={s.icon}
                  srcIcon={editIcon}
                />
                <Icon
                  onClick={() => onIconClick(DeckModals.DELETE, item)}
                  className={s.icon}
                  srcIcon={deleteIcon}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
