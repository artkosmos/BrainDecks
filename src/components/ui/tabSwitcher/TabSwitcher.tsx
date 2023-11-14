import * as Tabs from '@radix-ui/react-tabs'
import { Typography } from '@/components/ui/typography'
import s from './TabSwitcher.module.scss'

export type TabType = {
  id: string
  title: string
  disabledTab?: boolean
}

export type TabSwitcherProps = {
  label?: string
  orientation?: 'vertical' | 'horizontal'
  tabs: TabType[]
  activeTab?: string
  setActiveTab?: (id: string) => void
  tabClassName?: string
}

export const TabSwitcher = (props: TabSwitcherProps) => {
  const { orientation = 'horizontal', tabs, setActiveTab, label, activeTab, tabClassName } = props

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className={s.root}
      defaultValue={activeTab}
      orientation={orientation}
    >
      <Typography className={s.label} variant={'body2'}>
        {label}
      </Typography>
      <Tabs.List aria-label="tabs">
        {tabs.map((tab, index, tabs) => {
          const finalClassName = `${s.tab}
                     + ' ' + ${index === 0 ? s.firstTab : ''}
                     + ' ' + ${index === tabs.length - 1 ? s.lastTab : ''}
                     + ' ' + ${tabs.length === 1 ? s.singleTab : ''}
                     + ' ' + ${tabClassName}
                     `

          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={finalClassName}
              disabled={tab.disabledTab}
            >
              <Typography variant={'body1'}>{tab.title}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
