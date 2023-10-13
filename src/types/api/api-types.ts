export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type CardResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type ArgType = {
  deckId: string
  previousCardId?: string
}
