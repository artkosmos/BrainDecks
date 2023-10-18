import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewCardSchema } from '@/schemes'
import { CardsModals, NewCardFields } from '@/features/cards-pack'

type Props = {
  open: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  onSubmit?: (data: NewCardFields) => void
  selectOptions?: string[]
}

export const AddNewCardModal = ({ open, setOpenModal, onSubmit, selectOptions }: Props) => {
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
    <Modal open={open === CardsModals.CREATE} closeCallBack={closeModalHandler}>
      <Typography variant={'h2'}>Add New Card</Typography>
      <form onSubmit={onSubmitHandler}>
        <ControlledSelector
          label={'Chose a question format'}
          name={'selectCardFormat'}
          control={control}
          selectData={selectOptions}
        ></ControlledSelector>
        <ControlledInput
          autoFocus
          name={'question'}
          label={'Question'}
          control={control}
        ></ControlledInput>
        <ControlledInput name={'answer'} label={'Answer'} control={control}></ControlledInput>
        <Button type={'button'} onClick={closeModalHandler}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button type={'submit'} variant={'primary'}>
          <Typography variant={'subtitle2'}>Add Card</Typography>
        </Button>
      </form>
    </Modal>
  )
}
