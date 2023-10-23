import { SelectOptions } from '@/features/cards-pack/types'
import { TabType } from '@/components/ui/tabSwitcher'

export const paginationSelectOptions: SelectOptions = ['10', '20', '30', '50', '100']

export const cardSelectOptions: SelectOptions = ['text', 'picture']

export const decksTabs: TabType[] = [
  {
    id: '1',
    title: 'My Decks',
  },
  {
    id: '2',
    title: 'All Decks',
    defaultTab: true,
  },
]
