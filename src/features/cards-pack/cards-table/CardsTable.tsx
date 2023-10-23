import { Table } from '@/components/ui/tables'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import { EditIcon } from '@/assets/icons/components/EditIcon.tsx'
import { RatingStar } from '@/assets/icons/components/RatingStar.tsx'
import { DeleteIcon } from '@/assets/icons/components/DeleteIcon.tsx'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableHeadCellWithSort } from '@/components/ui/tables/SortTableHeader'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { Card } from '@/services/card-service'
import { Sort } from '@/services/deck-service'
import { CardsModals } from '@/features/cards-pack/types'
import { cardTableColumns } from '@/options'
import s from './CardsTable.module.scss'
import s1 from '@/features/deck-pack/deck-table/DeckTable.module.scss'

type Props = {
  onIconClick: (value: CardsModals | null, item: Card) => void
  data: Card[]
  sort?: Sort
  setSort?: (value: any) => void
  className?: string
  currentUserId?: string
  currentDeckAuthor?: string
}

export const CardsTable = (props: Props) => {
  const { data, sort, setSort, onIconClick, className, currentUserId, currentDeckAuthor } = props

  const isMyCards = currentUserId === currentDeckAuthor

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          <TableHeadCellWithSort columns={cardTableColumns} sort={sort} onSort={setSort} />
          {isMyCards && <TableHeadCell />}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => {
          const rating = Array.from({ length: 5 }, (_, index) => (
            <RatingStar key={index} selected={item.grade > index} />
          ))

          return (
            <TableRow key={item.id}>
              <TableCell>{item.question}</TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell>{new Date(item.updated).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className={s.starWrapper}>{rating}</div>
              </TableCell>
              {isMyCards && (
                <TableCell className={s.actions}>
                  <div className={s1.iconsWrapper}>
                    <EditIcon
                      onClick={() => onIconClick(CardsModals.UPDATE, item)}
                      className={s1.icon}
                    />
                    <DeleteIcon
                      onClick={() => onIconClick(CardsModals.DELETE, item)}
                      className={s1.icon}
                    />
                  </div>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
