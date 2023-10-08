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
      providesTags: ['Cards'],
    }),
    postCard: builder.mutation<any, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/decks/${packId}/cards`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    patchCard: builder.mutation<PatchResponse, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/decks/${packId}/cards`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<any, { cardId: string }>({
      query: ({ cardId, ...rest }) => ({
        url: `v1/cards/${cardId}`,
        method: 'DELETE',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetCardsQuery,
  usePostCardMutation,
  usePatchCardMutation,
  useDeleteCardMutation,
} = cardsApi
