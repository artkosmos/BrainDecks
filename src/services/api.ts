import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('x-auth-skip', 'true')
  },
})

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'DecksWithParams', 'Deck', 'Cards'],
  baseQuery,
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, void>({
        query: () => 'v1/decks',
        providesTags: ['Decks'],
      }),
      getDecksWithParams: builder.query<DecksResponse, string>({
        query: (currentPage: string) => `v1/decks?currentPage=${currentPage}`,
        providesTags: ['DecksWithParams'],
      }),
      getDeck: builder.query<DeckResponse, string>({
        query: (id: string) => `v1/decks/${id}/cards`,
        providesTags: ['Deck'],
      }),
      getCard: builder.query<CardResponse, string>({
        query: (id: string) => `v1/cards/${id}`,
        providesTags: ['Cards'],
      }),
    }
  },
})

export const { useGetDecksQuery, useGetDecksWithParamsQuery, useGetDeckQuery, useGetCardQuery } =
  baseApi

export type ResponsePagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type DecksResponseItems = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: DeckAuthor
}

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

export type DecksResponse = {
  maxCardsCount: number
  pagination: ResponsePagination
  items: DecksResponseItems[]
}

export type DeckResponse = {
  author: DeckAuthor
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type DeckAuthor = {
  id: string
  name: string
}

export type CardsResponse = {
  items: CardResponse[]
  pagination: ResponsePagination
}
