import {
  useGetCardQuery,
  // useGetDeckQuery,
  // useGetDecksWithParamsQuery
} from '@/services/api.ts'
import s from './CardPage.module.scss'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radioGroup'

export const CardPage = () => {
  const params = useParams()
  const cardId = params.id ? params.id : 'clmgvz5of0i79vo2qm7bj7jxm'

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)

  const { data } = useGetCardQuery(cardId)
  let deckName = 'DeckName' // ToDo change deckName

  // if (data?.deckId) {
  //   const deck = useGetDeckQuery(data.deckId)
  //
  //   deckName = deck.data ? deck.data.name : ''
  // }

  // const { data } = useGetDecksWithParamsQuery('6')
  // const { data } = useGetDeckQuery('clm9uty590gf3vo2qo2u80y81')

  // console.log(data?.items.filter(f => f.cardsCount !== 0))

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const rating = [
    {
      label: 'Did not know',
      value: '0',
    },
    {
      label: 'Forgot',
      value: '1',
    },
    {
      label: 'A lot of though',
      value: '2',
    },
    {
      label: 'Confused',
      value: '3',
    },
    {
      label: 'Knew the answer',
      value: '4',
    },
  ]

  console.log(data)

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography htmlTag={'h2'} variant={'h1'} className={s.title}>
          Learn {`"${deckName}"`}
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
        <Button onClick={onShowAnswer}>{isShowAnswer ? 'Next Question' : 'Show Answer'}</Button>
      </Card>
    </div>
  )
}
