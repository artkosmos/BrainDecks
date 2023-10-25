import { SelectOptions } from '@/features/cards-pack/types'
import { TabType } from '@/components/ui/tabSwitcher'
import { Column } from '@/features/deck-pack/types'

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

export const deckTableColumns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created by',
  },
]

export const cardTableColumns: Column[] = [
  {
    key: 'question',
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'grade',
    title: 'Grade',
  },
]
