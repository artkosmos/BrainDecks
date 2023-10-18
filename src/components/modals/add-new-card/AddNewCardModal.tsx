import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewCardSchema } from '@/schemes'
import { CardsModals, NewCardFields } from '@/features/cards-pack'
import s from './AddNewCardModal.module.scss'
import s1 from '@/components/modals/add-new-deck/AddNewDeckModal.module.scss'

type Props = {
  openModal: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  onSubmit?: (data: NewCardFields) => void
  selectOptions?: string[]
}

export const AddNewCardModal = ({ openModal, setOpenModal, onSubmit, selectOptions }: Props) => {
  const { control, handleSubmit, reset } = useForm<NewCardFields>({
    resolver: zodResolver(addNewCardSchema),
    mode: 'onSubmit',

    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
    closeModalHandler()
  })

  const closeModalHandler = () => {
    setOpenModal(null)
    reset({ question: '', answer: '' })
  }

  return (
    <Modal
      className={s1.modal}
      open={openModal === CardsModals.CREATE}
      closeCallBack={closeModalHandler}
    >
      <Typography className={s1.title} variant={'h2'}>
        Add New Card
      </Typography>
      <form className={s1.form} onSubmit={onSubmitHandler}>
        <ControlledSelector
          contentClassName={s.selector1}
          triggerClassName={s.selector2}
          label={'Chose a question format'}
          name={'selectCardFormat'}
          control={control}
          selectData={selectOptions}
        ></ControlledSelector>
        <ControlledInput
          className={s.questionInput}
          autoFocus
          name={'question'}
          label={'Question'}
          control={control}
        ></ControlledInput>
        <ControlledInput
          className={s.answerInput}
          name={'answer'}
          label={'Answer'}
          control={control}
        ></ControlledInput>
        <div className={s1.buttonArea}>
          <Button type={'button'} variant={'secondary'} onClick={closeModalHandler}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>Add Card</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
