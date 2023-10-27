import { useGetRandomCardWithQuery } from '@/services/learn-service/learn.service.ts'
import { rating } from '@/options'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { RadioGroup } from '@/components/ui/radioGroup'
import { useLocation, useParams } from 'react-router-dom'
import gearIcon from '@/assets/icons/gear_preloader.svg'
import s from './LearnCard.module.scss'
import s1 from '@/features/personal-page/PersonalPage.module.scss'

export const LearnCard = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)
  const [previousCardId, setPreviousCardId] = useState<string | undefined>()

  const { deckId } = useParams<{ deckId: string }>()
  const location = useLocation()

  const { data, isLoading } = useGetRandomCardWithQuery({
    deckId,
    previousCardId,
  })

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const nextQuestion = () => {
    setPreviousCardId(data?.id)
  }

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography htmlTag={'h2'} variant={'h1'} className={s.title}>
          Learn &quot;{location.state.name}&quot;
        </Typography>
        <div className={s.question}>
          <Typography htmlTag={'h3'} variant={'body1'}>
            {data?.question}
          </Typography>
          <Typography htmlTag={'p'} variant={'body2'} className={s.attempts}>
            количество попыток ответа на вопрос: 10
          </Typography>
        </div>
        {isShowAnswer && (
          <div className={s.rating}>
            <Typography variant={'body1'} htmlTag={'p'}>
              <b>Answer:</b> {data?.answer}
            </Typography>
            <Typography variant={'body1'} htmlTag={'p'}>
              <b>Rate yourself:</b>
            </Typography>
            <RadioGroup options={rating} />
          </div>
        )}
        <Button fullWidth onClick={isShowAnswer ? nextQuestion : onShowAnswer}>
          <Typography variant={'subtitle2'}>
            {isShowAnswer ? 'Next Question' : 'Show Answer'}
          </Typography>
        </Button>
      </Card>
    </div>
  )
}
