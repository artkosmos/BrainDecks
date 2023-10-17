import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/icon'
import leftArrow from '@/assets/icons/prevoius_page.svg'
import { Typography } from '@/components/ui/typography'
import { CardsModals, NewCardFields } from '@/types/common'
import { clsx } from 'clsx'
import { AddEditNewCardModal } from '@/components/modals/add-edit-new-card'
import s from './EmptyCardsPack.module.scss'

type Props = {
  openModal: CardsModals | null
  createDeck: (data: NewCardFields) => void
  deckId: string | undefined
  deckName: string | undefined
  setOpenModal: (value: CardsModals | null) => void
  className?: string
}

export const EmptyCardsPack = (props: Props) => {
  const { deckName, setOpenModal, className, openModal, createDeck } = props

  const contentClassName = clsx(s.contentWrapper, className)

  return (
    <div className={contentClassName}>
      <Button as={Link} to={'/'} variant={'link'} className={s.previousPage}>
        <Icon srcIcon={leftArrow} alt={'arrow'} />
        <Typography variant={'body2'}>Back to Deck List</Typography>
      </Button>
      <Typography className={s.deckName} variant={'large'}>
        {deckName}
      </Typography>
      <div className={s.buttonAndDescription}>
        <Typography variant={'body1'} className={s.description}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <Button className={s.button} onClick={() => setOpenModal(CardsModals.CREATE)}>
          <Typography variant={'subtitle2'}>Add New Card</Typography>
        </Button>
      </div>
      <AddEditNewCardModal
        open={openModal}
        setOpenModal={setOpenModal}
        createCardSubmit={createDeck}
      />
    </div>
  )
}
