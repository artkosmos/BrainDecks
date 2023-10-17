import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardFields } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewCardSchema } from '@/schemes'
import { memo } from 'react'

type Props = {
  open: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  createCardSubmit?: (data: NewCardFields) => void
  editCardSubmit?: (data: NewCardFields) => void
}

export const AddEditNewCardModal = memo(
  ({ open, setOpenModal, createCardSubmit, editCardSubmit }: Props) => {
    const { control, handleSubmit, reset } = useForm<NewCardFields>({
      resolver: zodResolver(addNewCardSchema),
      mode: 'onSubmit',

      defaultValues: {
        selectCardFormat: 'text',
        question: '',
        answer: '',
      },
    })

    const modalTitle = open === CardsModals.CREATE ? 'Add New Card' : 'Edit Card'
    const submitButtonText = open === CardsModals.CREATE ? 'Add Card' : 'Save Changes'
    const data = ['text', 'image']

    const onSubmitHandler = handleSubmit(data => {
      if (createCardSubmit) {
        console.log(data)
        createCardSubmit(data)
      }
      if (editCardSubmit) {
        editCardSubmit(data)
      }
    })

    const closeModalHandler = () => {
      setOpenModal(null)
      reset({ question: '', answer: '' })
    }

    return (
      <Modal
        open={open === CardsModals.CREATE || open === CardsModals.UPDATE}
        closeCallBack={closeModalHandler}
      >
        <Typography variant={'h2'}>{modalTitle}</Typography>
        <form onSubmit={onSubmitHandler}>
          <ControlledSelector
            label={'Chose a question format'}
            name={'selectCardFormat'}
            control={control}
            selectData={data}
          ></ControlledSelector>
          <ControlledInput name={'question'} label={'Question'} control={control}></ControlledInput>
          <ControlledInput name={'answer'} label={'Answer'} control={control}></ControlledInput>
          <Button type={'button'} onClick={closeModalHandler}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>{submitButtonText}</Typography>
          </Button>
        </form>
      </Modal>
    )
  }
)
