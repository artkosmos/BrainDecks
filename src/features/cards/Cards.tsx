import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import editIcon from '@/assets/icons/edit_icon.svg'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import headerLogo from '@/assets/icons/cardsLogo.png'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableRow } from '@/components/ui/tables/TableRow'
import { Pagination } from '@/components/ui/pagination'
import { Table } from '@/components/ui/tables'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableBody } from '@/components/ui/tables/TableBody'
import { useGetCardsQuery, usePostCardMutation } from '@/features/cards/CardsApi.ts'
import { TableCell } from '@/components/ui/tables/TableCell'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { AddNewCardModal } from '@/components/modals/cards/add-new-card/AddNewCardModal.tsx'
import { CardsModals } from '@/types/common'
import { Button } from '@/components/ui/button'
import { DeleteCard } from '@/components/modals/cards/delete-card/DeleteCard.tsx'
import { CardData } from '@/features/cards/Types.ts'
import { PackOptions } from '@/components/modals/cards/pack-options/PackOptions.tsx'
import s from './cards.module.scss'

export const Cards = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [itemData, setItemData] = useState<null | CardData>(null)
  const [openModal, setModalState] = useState<CardsModals | null>(null)
  const [postCard] = usePostCardMutation({})
  let temporaryPackId = 'clndbbkot0ss6vo2q2iwyp0j8'

  const { data } = useGetCardsQuery({
    packId: temporaryPackId,
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
  const deleteCardHandler = (item: CardData) => {
    setModalState(CardsModals.DELETE)
    setItemData(item)
  }

  //pagination
  const { currentPage, itemsPerPage, totalPages } = data.pagination

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
            {/*<span style={{ marginLeft: '10px', cursor: 'pointer' }}>*/}
            {/*  <FontAwesomeIcon*/}
            {/*    icon={faEllipsisVertical}*/}
            {/*    onClick={() => setModalState(CardsModals.OPEN_PACK_OPTIONS)}*/}
            {/*  />*/}
            {/*</span>*/}
            <span style={{ marginLeft: '10px' }}>
              <PackOptions />
              {/*тут ^ будет коллбек по откртию модалок */}
            </span>
            {/*{packUserId === userId && <DropDownMenu packId={packId} />}*/}
          </Typography>
          {/*{packUserId === userId ? (*/}
          <Button onClick={() => setModalState(CardsModals.CREATE)}>Add New Card</Button>
          <AddNewCardModal
            open={openModal}
            name={'Chose a question format'}
            setModalState={setModalState}
            createCard={addNewCardHandler}
          />
          {/*) : null}*/}
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
        <Table className={s.table}>
          <TableHead>
            <TableRow>
              <TableHeadCell>Question</TableHeadCell>
              <TableHeadCell>Answer</TableHeadCell>
              <TableHeadCell>Last Updated</TableHeadCell>
              <TableHeadCell>Grade</TableHeadCell>
              <TableHeadCell className={s.actionTableCell}></TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inputSearchData.map(item => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.answer}</TableCell>
                  <TableCell>{new Date(item.updated).toLocaleDateString()}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                  <TableCell className={s.actions}>
                    <Icon
                      className={s.icon}
                      srcIcon={deleteIcon}
                      alt={'delete icon'}
                      onClick={() => deleteCardHandler(item)}
                    />
                    <DeleteCard
                      open={openModal}
                      setModalState={setModalState}
                      cardId={itemData?.id}
                      cardQuestion={itemData?.question}
                    />
                    <Icon className={s.icon} srcIcon={editIcon} alt={'edit icon'} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={itemsPerPage}
        onChange={() => {}}
        totalCount={totalPages}
        options={selectOptions}
      />
    </div>
  )
}
