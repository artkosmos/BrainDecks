import { SelectOptions } from '@/features/cards-pack/types'
import { TabType } from '@/components/ui/tabSwitcher'
import { Column } from '@/features/deck-pack/types'
import { RadioGroupOptions } from '@/features/card-learn/types'

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

export const rating: RadioGroupOptions[] = [
  {
    label: 'Did not know',
    value: '1',
  },
  {
    label: 'Forgot',
    value: '2',
  },
  {
    label: 'A lot of though',
    value: '3',
  },
  {
    label: 'Confused',
    value: '4',
  },
  {
    label: 'Knew the answer',
    value: '5',
  },
]
