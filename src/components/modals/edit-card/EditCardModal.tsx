import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardFields } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewCardSchema } from '@/schemes'
import { useEffect } from 'react'
import { Card } from '@/services/card-service'

type Props = {
  open: CardsModals | null
  setOpenModal: (value: CardsModals | null) => void
  onSubmit?: (data: NewCardFields) => void
  activeCard: Card | undefined
  selectOptions?: string[]
}

export const EditCardModal = (props: Props) => {
  const { open, setOpenModal, onSubmit, activeCard, selectOptions } = props

  const { control, handleSubmit, reset } = useForm<NewCardFields>({
    resolver: zodResolver(addNewCardSchema),
    mode: 'onSubmit',

    defaultValues: {
      question: '',
      answer: '',
    },
  })

  useEffect(() => {
    resetFormFields()
  }, [activeCard])

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
    setOpenModal(null)
  })

  const resetFormFields = () => {
    if (activeCard) {
      const { question, answer } = activeCard

      reset({ question, answer })
    }
  }

  const closeModalHandler = () => {
    setOpenModal(null)
    resetFormFields()
  }

  return (
    <Modal open={open === CardsModals.UPDATE} closeCallBack={closeModalHandler}>
      <Typography variant={'h2'}>Edit Card</Typography>
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
          <Typography variant={'subtitle2'}>Save Changes</Typography>
        </Button>
      </form>
    </Modal>
  )
}
