import { ChangeEvent, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import searchIcon from '@/assets/icons/input_search.svg'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { CardsModals, NewCardFields } from '@/types/common'
import { Button } from '@/components/ui/button'
import { PackOptions } from '@/components/modals/pack-options/PackOptions.tsx'
import { AddEditNewCardModal } from '@/components/modals/add-edit-new-card/AddEditNewCardModal.tsx'
import { CardsTable } from '@/features/cards-pack/cards-table'
import {
  Card,
  GetCardsQueryParams,
  useCreateCardMutation,
  useGetCardsQuery,
  usePatchCardMutation,
} from '@/services/card-service'
import { useDebounce } from '@/hooks'
import { Icon } from '@/components/ui/icon'
import { Sort } from '@/services/deck-service'
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

  const [createCard] = useCreateCardMutation({})
  const [editCard] = usePatchCardMutation({})
  const { data } = useGetCardsQuery({
    id: deckId,
    question: debouncedInputValue,
    currentPage,
    itemsPerPage,
    orderBy: sortedString,
  })

  // useEffect(() => {
  //   setActiveCard(data.items)
  // }, [])

  const selectOptions = ['10', '20', '30', '50', '100']

  if (!data) {
    return null
  }

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  // const editCardHandler = async (question: string, answer: string) => {
  //   try {
  //     await editCard({ question, answer, packId: itemData ? itemData.id : '' })
  //     setModalState(null)
  //
  //     return 1
  //   } catch (e) {
  //     return
  //   }
  // }
  // const mutateCardHandler = (item: Card, mutationType: CardsModals) => {
  //   setModalState(mutationType)
  //   setItemData(item)
  // }

  const openModalHandler = (value: CardsModals | null, item?: Card) => {
    setOpenModal(value)
    setActiveCard(item)
  }

  const createCardHandler = (data: NewCardFields) => {
    const { question, answer } = data

    createCard({ deckId, question, answer })
  }

  const inputIcon = <Icon srcIcon={searchIcon} />

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <span>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <label className={s.backToCards}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#ffffff' }} />
              <Typography className={s.backToPacks} variant={'body2'}>
                Back to Packs List
              </Typography>
            </label>
          </Link>
        </span>

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
          />
        </div>
        <CardsTable
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
        options={selectOptions}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <AddEditNewCardModal
        open={openModal}
        setOpenModal={setOpenModal}
        createCardSubmit={createCardHandler}
      />
    </div>
  )
}
