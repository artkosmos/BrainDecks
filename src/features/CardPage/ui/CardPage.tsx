import {
  useGetCardQuery,
  // useGetDeckQuery,
  // useGetDecksWithParamsQuery
} from '@/services/api.ts'
import cls from './CardPage.module.scss'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useParams } from 'react-router-dom'

type CardPropsType = {
  cardId?: string
  deckName?: string
}

export const CardPage = (props: CardPropsType) => {
  let { cardId, deckName } = props
  const params = useParams()

  if (!cardId) {
    cardId = params.id
  }
  const { data } = useGetCardQuery(cardId ? cardId : 'clmgvz5of0i79vo2qm7bj7jxm') // ToDo refactor cardId

  // const { data } = useGetDecksWithParamsQuery('6')
  // const { data } = useGetDeckQuery('clm9uty590gf3vo2qo2u80y81')

  // console.log(data?.items.filter(f => f.cardsCount !== 0))

  if (!deckName) {
    deckName = 'Deck Name'
  }

  // console.log(card.data)

  return (
    <div className={cls.wrapper}>
      <Card>
        <Typography htmlTag={'h2'} variant={'h1'}>
          Learn {`"${deckName}"`}
        </Typography>
        <Typography htmlTag={'h3'} variant={'body1'}>
          {data?.question}
        </Typography>
      </Card>
    </div>
  )
}
