import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardField } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCardSchema } from '@/schemes'
import { memo } from 'react'

type AddEditNewCardPropsType = {
  open: CardsModals | null
  setModalState: (value: CardsModals | null) => void
  createCard?: (question: string, answer: string) => void
  editCard?: (question: string, answer: string) => void
}

export const AddEditNewCardModal = memo(
  ({ open, setModalState, createCard, editCard }: AddEditNewCardPropsType) => {
    const { control, handleSubmit } = useForm<NewCardField>({
      resolver: zodResolver(newCardSchema),
      mode: 'onSubmit',

      defaultValues: {
        selectCardFormat: 'text',
      },
    })

    const openModalType = open === CardsModals.CREATE || open === CardsModals.UPDATE
    const name = open === CardsModals.CREATE ? 'Add New Card' : 'Edit Card'
    const data = ['text', 'image']
    const onSubmitHandler = handleSubmit(data => {
      const { Question, Answer } = data

      if (createCard) {
        createCard(Question, Answer)
      }
      if (editCard) {
        editCard(Question, Answer)
      }
    })
    const closeModal = () => {
      setModalState(null)
    }

    return (
      <Modal
        // open={open === (CardsModals.CREATE || CardsModals.UPDATE)}
        open={openModalType}
        setModalState={setModalState}
      >
        <Typography>{name}</Typography>
        <form onSubmit={onSubmitHandler}>
          <ControlledSelector
            label={'Chose a question format'}
            name={'selectCardFormat'}
            control={control}
            selectData={data}
          ></ControlledSelector>
          <ControlledInput name={'Question'} label={'Question'} control={control}></ControlledInput>
          <ControlledInput name={'Answer'} label={'Answer'} control={control}></ControlledInput>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type={'submit'} variant={'primary'}>
            {/*onClick={addNewCardHandler}*/}
            <Typography variant={'h2'}>{name}</Typography>
          </Button>
        </form>
      </Modal>
    )
  }
)
