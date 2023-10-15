import s from './CardsPack.module.scss'

import { ChangeEvent, memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import headerLogo from '@/assets/icons/cardsLogo.png'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { AddEditNewCardModal } from '@/components/modals/add-edit-new-card/AddEditNewCardModal.tsx'
import { CardsModals } from '@/types/common'
import { Button } from '@/components/ui/button'
import { CardData } from '@/services/card-service/types.ts'
import { PackOptions } from '@/components/modals/pack-options/PackOptions.tsx'
import { CardsTable } from '@/features/cards-pack/cards-table'
import {
  useGetCardsQuery,
  usePatchCardMutation,
  usePostCardMutation,
} from '@/services/card-service'

export const CardsPack = memo(() => {
  const [inputValue, setInputValue] = useState<string>('')
  const [itemData, setItemData] = useState<null | CardData>(null)
  const [openModal, setModalState] = useState<CardsModals | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsOnPage, setItemsOnPage] = useState(10)
  const [postCard] = usePostCardMutation({})
  const [editCard] = usePatchCardMutation({})
  let temporaryPackId = 'clncye7q80smlvo2qvhrs59uo'

  const { data } = useGetCardsQuery({
    packId: temporaryPackId,
    currentPage,
    itemsPerPage: itemsOnPage,
  })

  const selectOptions = ['10', '20', '30', '50', '100']

  if (!data) {
    return null
  }

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const inputSearchData = data.items.filter(elements => {
    if (inputValue !== '') {
      return elements.question.includes(inputValue)
    } else {
      return elements
    }
  })

  const addNewCardHandler = async (question: string, answer: string) => {
    try {
      await postCard({ answer, question, packId: temporaryPackId })
      setModalState(null)
    } catch (e) {
      console.log(e)
    }
  }

  const editCardhandler = async (question: string, answer: string) => {
    try {
      await editCard({ question, answer, packId: itemData ? itemData.id : '' })
      setModalState(null)

      return 1
    } catch (e) {
      console.log(e)
    }
  }
  const mutateCardHandler = (item: CardData, mutationType: CardsModals) => {
    setModalState(mutationType)
    setItemData(item)
  }

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <span>
          <Link to={'/decks'} style={{ textDecoration: 'none', color: 'black' }}>
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
            {'packName'}
            <span style={{ marginLeft: '10px' }}>
              <PackOptions />
              {/*тут ^ будет коллбек по откртию модалок */}
            </span>
          </Typography>
          <Button onClick={() => setModalState(CardsModals.CREATE)}>Add New Card</Button>
          <AddEditNewCardModal
            open={openModal}
            setModalState={setModalState}
            createCard={addNewCardHandler}
          />
        </span>
        <img className={s.packImg} src={headerLogo} alt="" />
        <div className={s.searchContainer}>
          <Input
            className={s.input}
            name={'Search input'}
            onChange={changeSearchValue}
            value={inputValue}
          />
        </div>
        <CardsTable
          mutateCardHandler={mutateCardHandler}
          setModalState={setModalState}
          editCardHandler={editCardhandler}
          inputSearchData={inputSearchData}
          itemData={itemData}
          openModal={openModal}
        />
      </div>
      <Pagination
        currentPage={data.pagination.currentPage}
        pageSize={data.pagination.itemsPerPage}
        totalCount={data.pagination.totalItems}
        options={selectOptions}
        setItemsPerPage={setItemsOnPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
})
