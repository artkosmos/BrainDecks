import { baseApi } from '../api.ts'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponseData, GetDeckQueryParams | void>({
        query: params => {
          return {
            url: `v1/decks`,
            params: params ?? {},
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: body => ({
          url: `v1/decks`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = DecksService

export type CreateDeckArgs = Pick<Deck, 'name' | 'cover' | 'isPrivate'>

export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate?: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type Author = {
  id: string
  name: string
}

export type DeckResponseData = {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}

type Field = 'name' | 'update'

type Direction = 'asc' | 'desc'

export type GetDeckQueryParams = {
  name?: string
  authorId?: string
  orderBy?: `${Field}-${Direction}`
  currentPage?: number
  itemsPerPage?: number
  minCardsCount?: string
  maxCardsCount?: string
}
