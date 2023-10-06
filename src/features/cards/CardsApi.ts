import { baseApi } from '@/services/api.ts'
import { GetCardsPayload, GetCardsResponse } from '@/features/cards/Types.ts'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<GetCardsResponse, Pick<GetCardsPayload, 'id'>>({
      query: ({ id }) => `v1/decks/${id}/cards`,
    }),
  }),
})

export const { useGetCardsQuery } = cardsApi
