import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabSwitcher, TabType } from '@/components/ui/tabSwitcher'
import { Slider } from '@/components/ui/slider'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { DeckTable } from '@/features/deck-pack-page/deck-table'
import { ChangeEvent, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import {
  Deck,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/deck-service/decks.service.ts'
import { DeckModals, NewDeckNameField } from '@/types/common'
import { AddNewDeckModal } from '../../components/modals/add-new-deck'
import searchIcon from '@/assets/icons/input_search.svg'
import { EditDeckModal } from '@/components/modals/edit-deck'
import { DeleteDeckModal } from '@/components/modals/delete-deck'
import s from './DeckPackPage.module.scss'

export const DeckPackPage = () => {
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeDeck, setActiveDeck] = useState<Deck | undefined>()
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [sliderValues, setSliderValues] = useState<number[]>([0, 52])
  const [openModal, setOpenModal] = useState<DeckModals | null>(null)

  const selectOptions = ['10', '20', '30', '50', '100']

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

  const minCardsCount = String(sliderValues[0])
  const maxCardsCount = String(sliderValues[1])

  const inputIcon = <Icon srcIcon={searchIcon} />

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const { isLoading, data } = useGetDecksQuery({
    name,
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
  })

  console.log(data)

  // get max card value from data for slider useState
  // useEffect(() => {
  //   setSliderValues([0, data?.maxCardsCount || 52])
  // }, [data])

  const clearFilterHandler = () => {
    setName('')
    setSliderValues([0, 52])
  }

  const openModalHandler = (value: DeckModals | null, item?: Deck) => {
    setOpenModal(value)
    setActiveDeck(item)
  }

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: activeDeck?.id || '' })
  }

  const updateDeckHandler = (values: NewDeckNameField) => {
    updateDeck({ id: activeDeck?.id || '', name: values.name, isPrivate: values.isPrivate })
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA</div>
  }

  return (
    <div className={s.contentWrapper}>
      <div className={s.deckNameAndButton}>
        <Typography variant={'large'}>Deck&apos;s list</Typography>
        <Button onClick={() => openModalHandler(DeckModals.CREATE)}>
          <Typography>Add new deck</Typography>
        </Button>
      </div>
      <div className={s.tableSettings}>
        <Input
          placeholder={'Search'}
          className={s.searchInput}
          leftSideIcon={inputIcon}
          onChange={changeInputHandler}
        />
        <TabSwitcher tabs={tabs} />
        <Slider max={data.maxCardsCount} onValueChange={setSliderValues} value={sliderValues} />
        <Button variant={'secondary'} onClick={clearFilterHandler}>
          <Icon srcIcon={deleteIcon} />
          <Typography variant={'subtitle2'}>Clear filter</Typography>
        </Button>
      </div>
      <DeckTable data={data.items} onIconClick={openModalHandler} />
      <Pagination
        className={s.pagination}
        options={selectOptions}
        totalCount={data.pagination.totalItems}
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
      <AddNewDeckModal open={openModal} setOpen={setOpenModal} onSubmit={createDeck} />
      <EditDeckModal
        activeItem={activeDeck}
        open={openModal}
        setOpen={setOpenModal}
        onSubmit={updateDeckHandler}
      />
      <DeleteDeckModal deleteCallBack={deleteDeckHandler} open={openModal} setOpen={setOpenModal} />
    </div>
  )
}
