import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { CardsModals } from '@/types/common'
import { Button } from '@/components/ui/button'

type Props = {
  cardName: string | undefined
  openModal: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  deleteCallBack: () => void
  cardQuestion?: string
}
export const DeleteCardModal = ({ openModal, setOpenModal, deleteCallBack, cardName }: Props) => {
  const cancelModalHandler = () => {
    setOpenModal(null)
  }

  const deleteCardHandler = () => {
    deleteCallBack()
    setOpenModal(null)
  }

  return (
    <Modal open={openModal === CardsModals.DELETE} closeCallBack={cancelModalHandler}>
      <Typography variant={'h2'}>Delete Card</Typography>
      <Typography variant={'body1'}>
        Do you really want to remove <Typography variant={'subtitle1'}>{cardName}</Typography>?
      </Typography>
      <Button onClick={cancelModalHandler}>Cancel</Button>
      <Button onClick={deleteCardHandler}>Delete Card</Button>
    </Modal>
  )
}
