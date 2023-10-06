import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { useForm } from 'react-hook-form'
import { DeckModals, NewDeckNameField } from '@/types/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { newDeckNameSchema } from '@/schemes'
import { ControlledCheckbox } from '@/components/ui/controlled/controlledCheckbox'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Modal } from '@/components/ui/modal'
import s from './EditDeckModal.module.scss'

type Props = {
  open: DeckModals | null
  setOpen: (value: DeckModals | null) => void
  onSubmit: (values: NewDeckNameField) => void
}

export const EditDeckModal = ({ onSubmit, open, setOpen }: Props) => {
  const {
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<NewDeckNameField>({
    resolver: zodResolver(newDeckNameSchema),
    mode: 'onSubmit',
    defaultValues: { name: '', isPrivate: false },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit(data)
    setOpen(null)
  })

  const cancelModalHandler = () => {
    setOpen(null)
    // setValue('name', '')
  }

  return (
    <Modal className={s.modal} open={open === DeckModals.UPDATE}>
      <Typography className={s.title} variant={'h2'}>
        Edit Deck
      </Typography>
      <form onSubmit={onSubmitHandler} className={s.newDeckForm}>
        <ControlledInput
          aria-label={'enter new deck name'}
          className={s.input}
          control={control}
          placeholder={''}
          name={'name'}
          label={'Name Deck'}
          errorMessage={errors.name?.message}
        />
        <ControlledCheckbox
          className={s.checkbox}
          label={'Private pack'}
          control={control}
          name={'isPrivate'}
        />
        <div className={s.buttonArea}>
          <Button onClick={cancelModalHandler} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button type={'submit'}>
            <Typography variant={'subtitle2'}>Save Changes</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
