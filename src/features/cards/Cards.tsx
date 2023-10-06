import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import editIcon from '@/assets/icons/edit_icon.svg'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import s from './cards.module.scss'
import { Typography } from '@/components/ui/typography'
import headerLogo from '@/assets/icons/cardsLogo.png'
import { Button } from '@/components/ui/button'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableRow } from '@/components/ui/tables/TableRow'
import { Pagination } from '@/components/ui/pagination'
import { Table } from '@/components/ui/tables'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableBody } from '@/components/ui/tables/TableBody'
import {
  useDeleteCardMutation,
  useGetCardsQuery,
  usePostCardMutation,
} from '@/features/cards/CardsApi.ts'
import { TableCell } from '@/components/ui/tables/TableCell'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import { Icon } from '@/components/ui/icon'

export const Cards = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [postCard] = usePostCardMutation({})
  const [deleteCard] = useDeleteCardMutation({})

  let temporaryPackId = 'clncyq50p0smtvo2qnczpg2wr'
  const selectOptions = ['10', '20', '30', '50', '100']
  const { data } = useGetCardsQuery({
    packId: temporaryPackId,
  })

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

  const addNewCardHandler = async () => {
    let answer = 'answer'
    let question = 'question'

    try {
      await postCard({ answer, question, packId: temporaryPackId })
    } catch (e) {
      console.log(e)
    }
  }
  const deleteCardHandler = async () => {
    let cardId = 'clnf1cs3f0tk0vo2q3hjyztqx'

    try {
      await deleteCard({ cardId })
    } catch (e) {
      console.log(e)
    }
  }

  //pagination
  const { currentPage, itemsPerPage, totalPages, totalItems } = data.pagination

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
            <img className={s.packImg} src={headerLogo} alt="" />
            {/*{packUserId === userId && <DropDownMenu packId={packId} />}*/}
          </Typography>
          {/*{packUserId === userId ? (*/}
          <Button variant={'primary'} onClick={addNewCardHandler}>
            {/*<BaseModal modalTitle={'Add new card'} buttonType={'base'}>*/}
            {/*  {close => <AddCard closeModal={close} addCardCallback={addNewCardHandle} />}*/}
            {/*</BaseModal>*/}
            Add New Card
          </Button>
          {/*) : null}*/}
        </span>

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
                      onClick={deleteCardHandler}
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
