import { DeckModals } from '@/types/common'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import s from './DeleteDeckModal.module.scss'

type Props = {
  open: DeckModals
  setOpen: (value: DeckModals | null) => void
}
export const DeleteDeckModal = ({ open, setOpen }: Props) => {
  const cancelModalHandler = () => {
    setOpen(null)
  }

  return (
    <Modal className={s.modal} open={open === DeckModals.DELETE}>
      <Typography className={s.title} variant={'h2'}>
        Delete Deck
      </Typography>
      <Typography variant={'body1'}>
        Do you really want to remove <Typography variant={'subtitle1'}>Pack Name</Typography>?
      </Typography>
      <Typography className={s.subtitle}>All cards will be deleted.</Typography>
      <div className={s.buttonArea}>
        <Button onClick={cancelModalHandler} variant={'secondary'}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button>
          <Typography variant={'subtitle2'}>Delete Deck</Typography>
        </Button>
      </div>
    </Modal>
  )
}
