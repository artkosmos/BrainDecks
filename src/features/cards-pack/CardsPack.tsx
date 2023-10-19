import { ChangeEvent, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import searchIcon from '@/assets/icons/input_search.svg'
import leftArrow from '@/assets/icons/prevoius_page.svg'
import { Typography } from '@/components/ui/typography'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { EmptyCardsPack } from '@/features/empty-cards-pack'
import { Button } from '@/components/ui/button'
import { DeleteCardModal } from '@/components/modals/delete-card'
import { PackOptions } from '@/components/modals/pack-options/PackOptions.tsx'
import { AddNewCardModal } from '@/components/modals/add-new-card/AddNewCardModal.tsx'
import { CardsTable } from '@/features/cards-pack/cards-table'
import { EditCardModal } from '@/components/modals/edit-card'
import { Icon } from '@/components/ui/icon'
import { Sort } from '@/services/deck-service'
import { CardsModals, NewCardFields, SelectOptions } from '@/features/cards-pack/types.ts'
import {
  Card,
  GetCardsQueryParams,
  useCreateCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useGetCardsQuery,
} from '@/services/card-service'
import { useDebounce } from '@/hooks'
import s from './CardsPack.module.scss'

export const CardsPack = () => {
  const [question, setQuestion] = useState<string>('')
  const [openModal, setOpenModal] = useState<CardsModals | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activeCard, setActiveCard] = useState<Card | undefined>()
  const [sort, setSort] = useState<Sort | null>(null)

  const debouncedInputValue = useDebounce(question)

  const { deckId, deckName } = useParams<{ deckId: string; deckName: string }>()

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}` as GetCardsQueryParams['orderBy']
  }, [sort])

  const [createCard] = useCreateCardMutation()
  const [editCard] = useEditCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const { data, isLoading } = useGetCardsQuery({
    id: deckId || '',
    question: debouncedInputValue,
    currentPage,
    itemsPerPage,
    orderBy: sortedString,
  })

  const paginationSelectOptions: SelectOptions = ['10', '20', '30', '50', '100']
  const cardSelectOptions: SelectOptions = ['text', 'image']
  const inputIcon = <Icon srcIcon={searchIcon} />

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const openModalHandler = (value: CardsModals | null, item?: Card) => {
    setOpenModal(value)
    setActiveCard(item)
  }

  const createCardHandler = (data: NewCardFields) => {
    const { question, answer } = data

    createCard({ id: deckId || '', question, answer })
    setOpenModal(null)
  }

  const updateCardHandler = (data: NewCardFields) => {
    const { question, answer } = data

    editCard({ id: activeCard?.id || '', question, answer })
    setOpenModal(null)
  }

  const deleteCardHandler = () => {
    deleteCard({ id: activeCard?.id })
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ textAlign: 'center' }}>NO DATA RECEIVED</div>
  }

  if (!data.items.length) {
    return (
      <EmptyCardsPack
        openModal={openModal}
        deckName={deckName}
        deckId={deckId}
        setOpenModal={openModalHandler}
        createDeck={createCardHandler}
      />
    )
  }

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <Button as={Link} to={'/'} variant={'link'} className={s.previousPage}>
          <Icon srcIcon={leftArrow} alt={'arrow'} />
          <Typography variant={'body2'}>Back to Deck List</Typography>
        </Button>
        <span className={s.packAddName}>
          <Typography className={s.packName} variant={'large'}>
            {deckName}
            <span style={{ marginLeft: '10px' }}>
              <PackOptions />
              {/*тут ^ будет коллбек по откртию модалок */}
            </span>
          </Typography>
          <Button onClick={() => openModalHandler(CardsModals.CREATE)}>Add New Card</Button>
        </span>
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
          data={data.items}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <Pagination
        className={s.pagination}
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        totalCount={data.pagination.totalItems}
        options={paginationSelectOptions}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <AddNewCardModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={createCardHandler}
        selectOptions={cardSelectOptions}
      />
      <EditCardModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSubmit={updateCardHandler}
        activeCard={activeCard}
        selectOptions={cardSelectOptions}
      />
      <DeleteCardModal
        cardName={activeCard?.question}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cardQuestion={activeCard?.question}
        deleteCallBack={deleteCardHandler}
      />
    </div>
  )
}
