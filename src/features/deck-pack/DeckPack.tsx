import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Slider } from '@/components/ui/slider'
import { Icon } from '@/components/ui/icon'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { DeckTable } from '@/features/deck-pack/deck-table'
import { ChangeEvent, useMemo, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
  Deck,
  Sort,
  CreateDeckArgs,
  GetDeckQueryParams,
} from '@/services/deck-service'
import { getDeckFilterData } from '@/selectors'
import { decksTabs, paginationSelectOptions } from '@/options'
import { DeckModals, NewDeckFields } from '@/features/deck-pack/types'
import { AddNewDeckModal } from '@/components/modals/add-new-deck'
import searchIcon from '@/assets/icons/input_search.svg'
import { EditDeckModal } from '@/components/modals/edit-deck'
import { DeleteDeckModal } from '@/components/modals/delete-deck'
import { useDebounce } from '@/hooks'
import { useMeQuery } from '@/services/auth-service'
import { AppDispatch, useAppSelector } from '@/services/store.ts'
import { useDispatch } from 'react-redux'
import { sortFn } from '@/utils/sortFn.ts'
import {
  setActiveTab,
  setAuthorFilter,
  setCurrentPage,
  setDeckName,
  setItemsPerPage,
  setSliderValues,
  setSort,
} from '@/services/deck-slice.ts'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import s from './DeckPack.module.scss'
import s1 from '@/features/personal-page/PersonalPage.module.scss'

export const DeckPack = () => {
  const [activeDeck, setActiveDeck] = useState<Deck | undefined>()
  const [openModal, setOpenModal] = useState<DeckModals | null>(null)

  const dispatch = useDispatch<AppDispatch>()

  const deckFilterData = useAppSelector(getDeckFilterData)

  const sortByTableTitle = useMemo(() => sortFn(deckFilterData.sort), [deckFilterData.sort])

  const debouncedInputValue = useDebounce(deckFilterData.deckName)
  const debouncedSliderValues = useDebounce(deckFilterData.sliderValues)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const { data: userData } = useMeQuery()
  const { isLoading, data } = useGetDecksQuery({
    name: debouncedInputValue,
    currentPage: deckFilterData.currentPage,
    itemsPerPage: deckFilterData.itemsPerPage,
    maxCardsCount: String(debouncedSliderValues[1]),
    minCardsCount: String(debouncedSliderValues[0]),
    orderBy: sortByTableTitle as GetDeckQueryParams['orderBy'],
    authorId: deckFilterData.authorId,
  })

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA RECEIVED</div>
  }

  const clearFilterHandler = () => {
    dispatch(setSliderValues([0, data.maxCardsCount]))
    dispatch(setDeckName)
    dispatch(setAuthorFilter(undefined))
    dispatch(setActiveTab('2'))
    dispatch(setSort(null))
  }

  const openModalHandler = (value: DeckModals | null, item?: Deck) => {
    setOpenModal(value)
    setActiveDeck(item)
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: activeDeck?.id })
  }

  const columnSortHandler = (value: Sort | null) => {
    dispatch(setSort(value))
  }

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeckName(e.currentTarget.value))
  }

  const togglePageHandler = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const quantityItemsOnPageHandler = (quantity: number) => {
    dispatch(setItemsPerPage(quantity))
  }

  const createDeckHandler = (data: CreateDeckArgs) => {
    createDeck(data)
  }

  const changeSliderHandler = (values: number[]) => {
    dispatch(setSliderValues(values))
  }

  const updateDeckHandler = (data: NewDeckFields) => {
    const { name, isPrivate } = data

    updateDeck({ id: activeDeck?.id || '', name, isPrivate })
  }

  const authorFilterHandler = (tabId: string) => {
    if (tabId === '1') {
      if (userData) {
        dispatch(setAuthorFilter(userData.id))
      }
    }
    if (tabId === '2') {
      dispatch(setAuthorFilter(undefined))
    }
    dispatch(setActiveTab(tabId))
  }

  return (
    <div className={s.contentWrapper}>
      <div className={s.deckNameAndButton}>
        <Typography variant={'large'}>Deck&apos;s list</Typography>
        <Button onClick={() => openModalHandler(DeckModals.CREATE)}>
          <Typography variant={'subtitle2'}>Add new deck</Typography>
        </Button>
      </div>
      <div className={s.tableSettings}>
        <Input
          value={deckFilterData.deckName}
          placeholder={'Search'}
          className={s.searchInput}
          leftSideIcon={<Icon srcIcon={searchIcon} />}
          withoutError
          onChange={changeInputHandler}
        />
        <TabSwitcher
          activeTab={deckFilterData.activeTab}
          label={'Show decks cards'}
          setActiveTab={authorFilterHandler}
          tabs={decksTabs}
        />
        <Slider
          defaultValue={[0, data.maxCardsCount]}
          label={'Number of cards'}
          max={data.maxCardsCount}
          onValueChange={changeSliderHandler}
          value={deckFilterData.sliderValues}
        />
        <Button variant={'secondary'} onClick={clearFilterHandler}>
          <Icon srcIcon={deleteIcon} />
          <Typography variant={'subtitle2'}>Clear filter</Typography>
        </Button>
      </div>
      <DeckTable
        data={data.items}
        onIconClick={openModalHandler}
        sort={deckFilterData.sort}
        setSort={columnSortHandler}
        currentUserId={userData?.id}
      />
      <Pagination
        options={paginationSelectOptions}
        totalCount={data.pagination.totalItems}
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        setCurrentPageFn={togglePageHandler}
        setItemsPerPageFn={quantityItemsOnPageHandler}
      />
      <AddNewDeckModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={createDeckHandler}
      />
      <EditDeckModal
        activeItem={activeDeck}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={updateDeckHandler}
      />
      <DeleteDeckModal
        deckName={activeDeck?.name}
        deleteCallBack={deleteDeckHandler}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}
