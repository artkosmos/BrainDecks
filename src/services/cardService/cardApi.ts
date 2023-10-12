import { baseApi } from '@/services/api.ts'
import { CardResponse, ArgType } from '@/types/api'

export const cardApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRandomCard: builder.query<CardResponse, string>({
      query: deckId => `v1/decks/${deckId}/learn`,
      providesTags: ['RandomCard'],
    }),
    getRandomCardWith: builder.query<CardResponse, ArgType>({
      query: (arg: ArgType) =>
        `v1/decks/${arg.deckId}/learn${
          arg.previousCardId ? `?previousCardId=${arg.previousCardId}` : ''
        }`,
      providesTags: ['RandomCard'],
    }),
  }),
})

export const { useGetRandomCardQuery, useGetRandomCardWithQuery } = cardApi
