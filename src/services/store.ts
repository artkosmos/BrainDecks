import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/services/api.ts'
import { deckReducer } from '@/services/deck-slice.ts'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decksFilter: deckReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store
