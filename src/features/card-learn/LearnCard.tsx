import {
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
} from '@/services/learn-service/learn.service.ts'
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
import { LinearProgress } from '@mui/material'

export const LearnCard = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)
  const [grade, setGrade] = useState<string | undefined>()

  const { deckId } = useParams<{ deckId: string }>()
  const location = useLocation()

  const { data, isLoading } = useGetRandomCardQuery({ deckId })
  const [saveGrade, { isLoading: isUpdating }] = useSaveCardGradeMutation()

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const nextQuestion = () => {
    saveGrade({ deckId, cardId: data?.id, grade: Number(grade) })
    setIsShowAnswer(false)
    setGrade(undefined)
  }

  if (isLoading) {
    return <Icon className={s1.preloader} srcIcon={gearIcon} />
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Learn &quot;{location.state.name}&quot;
        </Typography>
        <div className={s.questionWrapper}>
          <Typography className={s.question} variant={'subtitle1'}>
            Question: <Typography variant={'body1'}>{data?.question}</Typography>
          </Typography>
          {data?.questionImg && <Icon className={s.image} srcIcon={data.questionImg} />}
        </div>
        <Typography variant={'body2'} className={s.attempts}>
          Number of attempts to answer a question: <b>10</b>
        </Typography>
        {isShowAnswer && (
          <div className={s.rating}>
            <Typography variant={'subtitle1'}>
              Answer: <Typography variant={'body1'}>{data?.answer}</Typography>
            </Typography>
            {data?.answerImg && <Icon className={s.image} srcIcon={data.answerImg} />}
            <Typography variant={'subtitle1'}>Rate yourself:</Typography>
            <RadioGroup options={rating} value={grade} onValueChange={setGrade} />
          </div>
        )}
        <Button className={s.button} fullWidth onClick={isShowAnswer ? nextQuestion : onShowAnswer}>
          <Typography variant={'subtitle2'}>
            {isShowAnswer ? 'Next Question' : 'Show Answer'}
          </Typography>
        </Button>
        {isUpdating && <LinearProgress color={'success'} />}
      </Card>
    </div>
  )
}
