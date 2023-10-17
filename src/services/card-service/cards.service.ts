import { baseApi } from '@/services/api.ts'
import {
  CardsResponseData,
  CreateCardArgs,
  GetCardsQueryParams,
  PatchResponse,
} from '@/services/card-service'

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<CardsResponseData, GetCardsQueryParams>({
      query: ({ id, ...rest }) => ({
        url: `v1/decks/${id}/cards`,
        params: rest ?? {},
      }),
      providesTags: ['Cards'],
    }),
    createCard: builder.mutation<any, CreateCardArgs>({
      query: ({ deckId, ...rest }) => ({
        url: `v1/decks/${deckId}/cards`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    patchCard: builder.mutation<PatchResponse, CreateCardArgs>({
      query: ({ deckId, ...rest }) => ({
        url: `v1/cards/${deckId}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<void, { id: string | undefined }>({
      query: id => ({
        url: `v1/cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetCardsQuery,
  usePatchCardMutation,
  useDeleteCardMutation,
  useCreateCardMutation,
} = cardsService
