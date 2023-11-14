import {
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
} from '@/services/learn-service/learn.service.ts'
import { rating } from '@/options'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { useLocation, useParams } from 'react-router-dom'
import { RateForm } from '@/components/ui/rateForm'
import { useI18N } from '@/hooks'
import { GradeField } from '@/schemes/types'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import s from './LearnCard.module.scss'
import s1 from '@/features/personal-page/PersonalPage.module.scss'

export const LearnCard = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)

  const { deckId } = useParams<{ deckId: string }>()
  const location = useLocation()
  const { t } = useI18N()

  const { data: cardData, isLoading } = useGetRandomCardQuery({ deckId })
  const [saveGrade, { isLoading: isUpdating, isSuccess }] = useSaveCardGradeMutation()

  useEffect(() => {
    if (isSuccess) {
      setIsShowAnswer(false)
    }
  }, [isSuccess])

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const nextQuestionHandler = (data: GradeField) => {
    saveGrade({ deckId, cardId: cardData?.id, grade: Number(data.grade) })
  }

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          {t('learn', { deck: location.state.name })}
        </Typography>
        <div className={s.questionWrapper}>
          <Typography variant={'subtitle1'}>
            {t('question')}: <Typography variant={'body1'}>{cardData?.question}</Typography>
          </Typography>
          {cardData?.questionImg && <Icon className={s.image} srcIcon={cardData.questionImg} />}
        </div>
        <Typography variant={'body2'} className={s.attempts}>
          {t('numberOfAttempts')}: <b>10</b>
        </Typography>
        {isShowAnswer && (
          <div className={s.rating}>
            <Typography variant={'subtitle1'}>
              {t('answer')}: <Typography variant={'body1'}>{cardData?.answer}</Typography>
            </Typography>
            {cardData?.answerImg && <Icon className={s.image} srcIcon={cardData.answerImg} />}
            <Typography variant={'subtitle1'}>{t('rateYourself')}:</Typography>
            <RateForm onSubmit={nextQuestionHandler} options={rating} isUpdating={isUpdating} />
          </div>
        )}
        {!isShowAnswer && (
          <Button className={s.button} fullWidth onClick={onShowAnswer}>
            <Typography variant={'subtitle2'}>{t('showAnswer')}</Typography>
          </Button>
        )}
      </Card>
    </div>
  )
}
