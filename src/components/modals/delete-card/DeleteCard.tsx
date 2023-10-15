import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { CardsModals } from '@/types/common'
import { Button } from '@/components/ui/button'
import { useDeleteCardMutation } from '@/services/card-service'
import s from './DeleteCard.module.scss'

type DeleteCardProps = {
  open: CardsModals | null
  setModalState: (value: CardsModals | null) => void
  cardId?: string
  cardQuestion?: string
}
export const DeleteCard = ({ open, cardId, cardQuestion, setModalState }: DeleteCardProps) => {
  const [deleteCard] = useDeleteCardMutation({})

  const closeModal = () => {
    setModalState(null)
  }

  const deleteHandler = async () => {
    try {
      if (cardId) {
        await deleteCard({ cardId })
        setModalState(null)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal open={open === CardsModals.DELETE} setModalState={setModalState}>
      <Typography>Delete Card</Typography>
      <Dialog.Description className={s.dialogDescription}>
        {`Do you really want to remove card - ${cardQuestion}?`}
      </Dialog.Description>
      <Button onClick={closeModal}>Cancel</Button>
      <Button onClick={deleteHandler}>Delete Card</Button>
    </Modal>
  )
}
