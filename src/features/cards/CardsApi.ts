import { baseApi } from '@/services/api.ts'
import {
  GetCardsPayload,
  GetCardsResponse,
  PatchResponse,
  PostCardPayload,
} from '@/features/cards/Types.ts'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<GetCardsResponse, Pick<GetCardsPayload, 'packId'>>({
      query: ({ packId }) => `v1/decks/${packId}/cards`,
    }),
    postCard: builder.mutation<any, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/decks/${packId}/cards`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Decks'],
    }),
    patchCard: builder.mutation<PatchResponse, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/decks/${packId}/cards`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Decks'],
    }),
    // postCard: builder.mutation<any, PostCardPayload>({
    //   query: ({ packId, ...rest }) => ({
    //     url: `v1/decks/${packId}/cards`,
    //     method: 'POST',
    //     body: rest,
    //   }),
    //   invalidatesTags: ['Decks'],
    // }),
  }),
})

export const { useGetCardsQuery, usePostCardMutation } = cardsApi
