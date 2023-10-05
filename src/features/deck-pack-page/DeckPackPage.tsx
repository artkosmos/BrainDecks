import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabSwitcher, TabType } from '@/components/ui/tabSwitcher'
import { Slider } from '@/components/ui/slider'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { DeckTable } from '@/features/deck-pack-page/deck-table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/deck-service/decks.service.ts'
import { useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import s from './DeckPackPage.module.scss'

const tabs: TabType[] = [
  {
    id: '1',
    title: 'My Cards',
  },
  {
    id: '2',
    title: 'All Cards',
  },
]

export const DeckPackPage = () => {
  const [name, setName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [createDeck] = useCreateDeckMutation()

  const { isLoading, data } = useGetDecksQuery({ name, currentPage, itemsPerPage })

  const selectOptions = ['10', '20', '30', '50', '100']

  console.log(useGetDecksQuery())

  return (
    <div className={s.contentWrapper}>
      <div className={s.deckNameAndButton}>
        <Typography variant={'large'}>Deck&apos;s list</Typography>
        <Button className={s.createDeckButton} onClick={() => createDeck({ name: 'чырык' })}>
          <Typography>Add new deck</Typography>
        </Button>
      </div>
      <div className={s.tableSettings}>
        <Input className={s.searchInput} onChange={e => setName(e.currentTarget.value)} />
        <TabSwitcher tabs={tabs} />
        <Slider />
        <Button variant={'secondary'}>
          <Icon srcIcon={deleteIcon} />
          Clear filter
        </Button>
      </div>
      {isLoading && <span>Loading...</span>}
      <DeckTable data={data?.items || []} />
      <Pagination
        options={selectOptions}
        totalCount={data?.pagination.totalItems || 0}
        currentPage={data?.pagination.currentPage || 1}
        pageSize={data?.pagination.itemsPerPage || 1}
        onChange={setCurrentPage}
        selectFilterChange={setItemsPerPage}
      />
    </div>
  )
}
