import { ControlledInput } from '@/components/ui/controlled/controlledInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newDeckNameSchema } from '@/schemes'
import { ControlledCheckbox } from '@/components/ui/controlled/controlledCheckbox'
import { ControlledFileInput } from '@/components/ui/controlled/controlledFileInput'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Modal } from '@/components/ui/modal'
import { DeckModals, NewDeckFields } from '@/features/deck-pack/types'
import s from './AddNewDeckModal.module.scss'

type Props = {
  openModal: DeckModals | null
  setOpenModal: (value: DeckModals | null) => void
  onSubmit?: (values: NewDeckFields) => void
}

export const AddNewDeckModal = ({ onSubmit, openModal, setOpenModal }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewDeckFields>({
    resolver: zodResolver(newDeckNameSchema),
    mode: 'onSubmit',
    defaultValues: { name: '', isPrivate: false },
  })

  const onSubmitHandler = handleSubmit(data => {
    onSubmit?.(data)
    cancelModalHandler()
  })

  const cancelModalHandler = () => {
    setOpenModal(null)
    reset({ name: '', isPrivate: false })
  }

  return (
    <Modal
      className={s.modal}
      open={openModal === DeckModals.CREATE}
      closeCallBack={cancelModalHandler}
    >
      <Typography className={s.title} variant={'h2'}>
        Add New Deck
      </Typography>
      <form onSubmit={onSubmitHandler} className={s.form}>
        <ControlledFileInput
          className={s.fileInput}
          control={control}
          name={'cover'}
          buttonText={'Cover Image'}
          id={'cover'}
        />
        <ControlledInput
          aria-label={'enter new deck name'}
          control={control}
          name={'name'}
          label={'Name Deck'}
          errorMessage={errors.name?.message}
          autoFocus
        />
        <ControlledCheckbox
          className={s.checkbox}
          label={'Private deck'}
          control={control}
          name={'isPrivate'}
        />
        <div className={s.buttonArea}>
          <Button onClick={cancelModalHandler} type={'button'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
          <Button type={'submit'}>
            <Typography variant={'subtitle2'}>Add Deck</Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
