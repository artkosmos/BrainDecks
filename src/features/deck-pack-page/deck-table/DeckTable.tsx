import { Table } from '@/components/ui/tables'
import { Deck } from '@/services/deck-service/decks.service.ts'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'

type Props = {
  data: Deck[]
}

export const DeckTable = (props: Props) => {
  const { data } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Updated</TableHeadCell>
          <TableHeadCell>Created by</TableHeadCell>
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
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
