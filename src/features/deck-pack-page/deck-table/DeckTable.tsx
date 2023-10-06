import { Table } from '@/components/ui/tables'
import { Deck } from '@/services/deck-service/decks.service.ts'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import playIcon from '@/assets/icons/play_icon.svg'
import editIcon from '@/assets/icons/edit_icon.svg'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { Icon } from '@/components/ui/icon'
import { DeckModals } from '@/types/common'
import s from './DeckTable.module.scss'

type Props = {
  onIconClick: (value: DeckModals | null) => void
  className?: string
  data: Deck[]
}

export const DeckTable = (props: Props) => {
  const { data, className, onIconClick } = props

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Created by</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>
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
                  onClick={() => onIconClick(DeckModals.UPDATE)}
                  className={s.icon}
                  srcIcon={editIcon}
                />
                <Icon
                  onClick={() => onIconClick(DeckModals.DELETE)}
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
