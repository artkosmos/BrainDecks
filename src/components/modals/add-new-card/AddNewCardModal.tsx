import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CardsModals, NewCardField } from '@/types/common'
import { useForm } from 'react-hook-form'
import { ControlledSelector } from '@/components/ui/controlled/controlledSelect'
import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCardSchema } from '@/schemes'

type AddNewCardPropsType = {
  open: CardsModals | null
  setOpen: (value: CardsModals | null) => void
  name: string
}

export const AddNewCardModal = ({ open, setOpen }: AddNewCardPropsType) => {
  const { control, handleSubmit } = useForm<NewCardField>({
    resolver: zodResolver(newCardSchema),
    mode: 'onSubmit',

    defaultValues: {
      selectCardFormat: 'text',
    },
  })

  const data = ['text', 'image']
  const onSubmitHandler = handleSubmit(data => {
    console.log(data)
  })
  const closeModal = () => {
    setOpen(null)
  }

  return (
    <Modal open={open === CardsModals.CREATE}>
      <Typography>Add New Card</Typography>
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
          <Typography variant={'h2'}>Add New Card</Typography>
        </Button>
      </form>
    </Modal>
  )
}
