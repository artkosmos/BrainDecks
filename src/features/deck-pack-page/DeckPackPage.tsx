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
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [sliderValues, setSliderValues] = useState<number[]>([0, 52])

  const selectOptions = ['10', '20', '30', '50', '100']

  const minCardsCount = String(sliderValues[0])
  const maxCardsCount = String(sliderValues[1])

  const [createDeck] = useCreateDeckMutation()

  const { isLoading, data } = useGetDecksQuery({
    name,
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
  })

  const clearFilterHandler = () => {
    setName('')
    setSliderValues([0, 52])
  }

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
        <Slider max={data?.maxCardsCount} onValueChange={setSliderValues} value={sliderValues} />
        <Button variant={'secondary'} onClick={clearFilterHandler}>
          <Icon className={s.deleteIcon} srcIcon={deleteIcon} />
          <Typography variant={'subtitle2'}>Clear filter</Typography>
        </Button>
      </div>
      {isLoading && <span>Loading...</span>}
      <DeckTable data={data?.items || []} />
      <Pagination
        options={selectOptions}
        totalCount={data?.pagination.totalItems || 1}
        currentPage={data?.pagination.currentPage || 1}
        pageSize={data?.pagination.itemsPerPage || 1}
        onChange={setCurrentPage}
        selectFilterChange={setItemsPerPage}
      />
    </div>
  )
}
