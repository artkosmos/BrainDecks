import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Selector } from '@/components/ui/select'
import { ControlledFileInput } from '@/components/ui/controlled/controlledFileInput'
import { useState } from 'react'
import { addNewCardSchema } from '@/schemes'
import { CardsModals, NewCardFields } from '@/features/cards-pack/types'
import s from './AddNewCardModal.module.scss'
import s1 from '@/components/modals/add-new-deck/AddNewDeckModal.module.scss'

type Props = {
  openModal: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  onSubmit?: (data: NewCardFields) => void
  selectOptions?: string[]
}

export const AddNewCardModal = ({ openModal, setOpenModal, onSubmit, selectOptions }: Props) => {
  const [cardType, setCardType] = useState('text')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCardFields>({
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
    setCardType('text')
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
        <Selector
          className={s.selector}
          value={cardType}
          setSelectedValue={setCardType}
          label={'Chose a question format'}
          selectData={selectOptions}
        />
        {cardType === 'picture' && (
          <ControlledFileInput
            className={s.fileInput}
            control={control}
            name={'questionImg'}
            id={'questionImg'}
            buttonText={'Change Question Cover'}
          />
        )}
        <ControlledInput
          className={s.questionInput}
          autoFocus
          name={'question'}
          label={'Question'}
          control={control}
          errorMessage={errors.question?.message}
        />
        {cardType === 'picture' && (
          <ControlledFileInput
            className={s.fileInput}
            control={control}
            name={'answerImg'}
            id={'answerImg'}
            buttonText={'Change Answer Cover'}
          />
        )}
        <ControlledInput
          className={s.answerInput}
          name={'answer'}
          label={'Answer'}
          control={control}
          errorMessage={errors.answer?.message}
        />
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
