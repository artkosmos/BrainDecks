import { ChangeEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { EmptyCardsPack } from '@/features/empty-cards-pack'
import { Button } from '@/components/ui/button'
import { DeleteCardModal } from '@/components/modals/delete-card'
import { AddNewCardModal } from '@/components/modals/add-new-card/AddNewCardModal.tsx'
import { CardsTable } from '@/features/cards-pack/cards-table'
import { EditCardModal } from '@/components/modals/edit-card'
import { DropDownMenu } from '@/components/ui/dropDownMenu'
import { DropDownItem } from '@/components/ui/dropDownMenu/dropDownItem'
import { PlayCardIcon } from '@/assets/icons/components/PlayCardIcon.tsx'
import { EditDeckModal } from '@/components/modals/edit-deck'
import { EditIcon } from '@/assets/icons/components/EditIcon.tsx'
import { DeleteIcon } from '@/assets/icons/components/DeleteIcon.tsx'
import { DeleteDeckModal } from '@/components/modals/delete-deck'
import { Icon } from '@/components/ui/icon'
import { PreviousPage } from '@/assets/icons/components/PreviousPage.tsx'
import { useDebounce } from '@/hooks'
import {
  Sort,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '@/services/deck-service'
import { CardsModals, NewCardFields } from '@/features/cards-pack/types'
import { DeckModals, NewDeckFields } from '@/features/deck-pack/types'
import {
  Card,
  GetCardsQueryParams,
  useCreateCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useGetCardsQuery,
} from '@/services/card-service'
import { useMeQuery } from '@/services/auth-service'
import { cardSelectOptions, paginationSelectOptions } from '@/options'
import dots from '@/assets/icons/dots.svg'
import searchIcon from '@/assets/icons/input_search.svg'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import s from './CardsPack.module.scss'
import s1 from '@/features/personal-page/PersonalPage.module.scss'

export const CardsPack = () => {
  const [question, setQuestion] = useState<string>('')
  const [openCardModal, setOpenCardModal] = useState<CardsModals | null>(null)
  const [openDeckModal, setOpenDeckModal] = useState<DeckModals | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activeCard, setActiveCard] = useState<Card | undefined>()
  const [sort, setSort] = useState<Sort | null>(null)

  const debouncedInputValue = useDebounce(question)

  const { deckId } = useParams<{ deckId: string }>()

  const navigate = useNavigate()

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}` as GetCardsQueryParams['orderBy']
  }, [sort])

  const [createCard] = useCreateCardMutation()
  const [editCard] = useEditCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const { data: deckData, isLoading: isDeckLoading } = useGetDeckQuery({ id: deckId })
  const { data: userData } = useMeQuery()
  const { data: cardData, isLoading: isCardsLoading } = useGetCardsQuery({
    id: deckId || '',
    question: debouncedInputValue,
    currentPage,
    itemsPerPage,
    orderBy: sortedString,
  })

  if (isCardsLoading || isDeckLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  if (!cardData || !deckData) {
    return <div style={{ textAlign: 'center' }}>NO DATA RECEIVED</div>
  }

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const openModalHandler = (value: CardsModals | null, item?: Card) => {
    setOpenCardModal(value)
    setActiveCard(item)
  }

  const createCardHandler = (data: NewCardFields) => {
    createCard({ id: deckData.id || '', ...data })
  }

  const updateCardHandler = (data: NewCardFields) => {
    editCard({ id: activeCard?.id || '', ...data })
  }

  const updateDeckHandler = (data: NewDeckFields) => {
    const { name, isPrivate } = data

    updateDeck({ id: deckData.id || '', name, isPrivate })
  }

  const deleteCardHandler = () => {
    deleteCard({ id: activeCard?.id })
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: deckData.id })
    navigate('/decks')
  }

  const learnDeckHandler = () => {
    navigate(`/decks/${deckData.id}/learn`, { state: { name: deckData.name } })
  }

  if (!cardData.items.length) {
    return (
      <EmptyCardsPack
        openModal={openCardModal}
        deckName={deckData.name}
        deckId={deckData.id}
        setOpenModal={openModalHandler}
        createDeck={createCardHandler}
        currentUserId={userData?.id}
        currentDeckAuthor={deckData.userId}
      />
    )
  }

  const dropDownTrigger = <Icon srcIcon={dots} className={s.triggerIcon} />
  const inputIcon = <Icon srcIcon={searchIcon} />

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <Button as={Link} to={'/'} variant={'link'} className={s.previousPage}>
          <PreviousPage className={s.arrow} />
          <Typography variant={'body2'}>Back to Deck List</Typography>
        </Button>
        <div className={s.deckNameAndButtonWrapper}>
          <div className={s.deckNameWrapper}>
            <Typography variant={'large'}>{deckData.name}</Typography>
            <DropDownMenu
              sideOffset={12}
              alignOffset={-15}
              trigger={dropDownTrigger}
              triggerButtonClassName={s.triggerButton}
            >
              <DropDownItem className={s.dropDownMenuItem} onClick={learnDeckHandler}>
                <PlayCardIcon width={15} height={15} />
                Learn
              </DropDownItem>
              <DropDownItem
                className={s.dropDownMenuItem}
                onClick={() => setOpenDeckModal(DeckModals.UPDATE)}
              >
                <EditIcon width={15} height={15} />
                Edit
              </DropDownItem>
              <DropDownItem
                className={s.dropDownMenuItem}
                onClick={() => setOpenDeckModal(DeckModals.DELETE)}
              >
                <DeleteIcon width={15} height={15} />
                Delete
              </DropDownItem>
            </DropDownMenu>
          </div>
          <Button onClick={() => openModalHandler(CardsModals.CREATE)}>Add New Card</Button>
        </div>
        <div className={s.searchContainer}>
          <Input
            className={s.input}
            placeholder={'Search question'}
            leftSideIcon={inputIcon}
            onChange={changeSearchValue}
            value={question}
            withoutError
          />
        </div>
        <CardsTable
          className={s.table}
          onIconClick={openModalHandler}
          data={cardData.items}
          sort={sort}
          setSort={setSort}
          currentUserId={userData?.id}
          currentDeckAuthor={deckData.userId}
        />
      </div>
      <Pagination
        className={s.pagination}
        currentPage={cardData.pagination.currentPage}
        pageSize={cardData.pagination.itemsPerPage}
        totalCount={cardData.pagination.totalItems}
        options={paginationSelectOptions}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <AddNewCardModal
        openModal={openCardModal}
        setOpenModal={setOpenCardModal}
        onSubmit={createCardHandler}
        selectOptions={cardSelectOptions}
      />
      <EditCardModal
        openModal={openCardModal}
        setOpenModal={setOpenCardModal}
        onSubmit={updateCardHandler}
        activeCard={activeCard}
        selectOptions={cardSelectOptions}
      />
      <DeleteCardModal
        cardName={activeCard?.question}
        openModal={openCardModal}
        setOpenModal={setOpenCardModal}
        cardQuestion={activeCard?.question}
        deleteCallBack={deleteCardHandler}
      />
      <EditDeckModal
        openModal={openDeckModal}
        setOpenModal={setOpenDeckModal}
        onSubmit={updateDeckHandler}
        activeItem={deckData}
      />
      <DeleteDeckModal
        deckName={deckData.name}
        deleteCallBack={deleteDeckHandler}
        openModal={openDeckModal}
        setOpenModal={setOpenDeckModal}
      />
    </div>
  )
}
