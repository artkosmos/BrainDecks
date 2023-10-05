import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import s from './cards.module.scss'
import { Typography } from '@/components/ui/typography'
import headerLogo from '@/assets/icons/cardsLogo.png'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { useForm } from 'react-hook-form'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { TableRow } from '@/components/ui/tables/TableRow'
import { Pagination } from '@/components/ui/pagination'
import { Table } from '@/components/ui/tables'
import { TableHead } from '@/components/ui/tables/TableHead'
import { TableBody } from '@/components/ui/tables/TableBody'

export const Cards = () => {
  const { register, control, handleSubmit } = useForm<FormValues>()

  const data = ['asasasas', 'asaasasas']

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <span>
          <Link to={'/packs'} style={{ textDecoration: 'none', color: 'black' }}>
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
          <Button variant={'primary'}>
            {/*<BaseModal modalTitle={'Add new card'} buttonType={'base'}>*/}
            {/*  {close => <AddCard closeModal={close} addCardCallback={addNewCardHandle} />}*/}
            {/*</BaseModal>*/}
            Add New Card
          </Button>
          {/*) : null}*/}
        </span>

        <div className={s.searchContainer}>
          <ControlledInput className={s.input} name={'Search input'} control={control} />
        </div>
        <Table className={s.table}>
          <TableHead>
            <TableHeadCell>Question</TableHeadCell>
            <TableHeadCell>Answer</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Grade</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>

          <TableBody>
            {data.map(item => {
              return <TableRow key={item}>{item}</TableRow>
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={1}
        pageSize={20}
        onChange={() => {}}
        totalCount={2}
        options={['sa']}
      />
    </div>
  )
}
