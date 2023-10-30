import { RootState } from '@/services/store.ts'
import { DeckFilterState } from '@/services/deck-slice.ts'

export const getDeckFilterData = (state: RootState): DeckFilterState => state.decksFilter
