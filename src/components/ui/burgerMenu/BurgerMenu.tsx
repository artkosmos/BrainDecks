import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { Icon } from '@/components/ui/icon'
import burger from '@/assets/icons/hamburger-menu.svg'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { decksTabsEN, decksTabsRU, languageTabs } from '@/options'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import deleteIcon from '@/assets/icons/delete_icon.svg'
import { Typography } from '@/components/ui/typography'
import { useI18N } from '@/hooks'
import { AppDispatch, useAppSelector } from '@/services/store.ts'
import { getCurrentLanguage, getDeckFilterData, getLanguageTab } from '@/selectors'
import { setActiveLanguageTab } from '@/services/app-service/app-slice.ts'
import { useDispatch } from 'react-redux'

export const BurgerMenu = () => {
  const [open, setState] = useState(false)
  const { t, handleChangeLanguage } = useI18N()
  const dispatch = useDispatch<AppDispatch>()

  const deckFilterData = useAppSelector(getDeckFilterData)
  const currentLanguage = useAppSelector(getCurrentLanguage)
  const activeTab = useAppSelector(getLanguageTab)

  const setLanguageHandler = (tabId: string) => {
    dispatch(setActiveLanguageTab(tabId))
    handleChangeLanguage()
  }

  return (
    <>
      <Icon srcIcon={burger} width={36} color={'white'} onClick={() => setState(true)} />
      <Drawer
        elevation={1}
        anchor="right" //from which side the drawer slides in
        variant="temporary" //if and how easily the drawer can be closed
        open={open} //if open is true, drawer is shown
        onClose={() => setState(false)} //function that is called when the drawer should close
      >
        <div
          style={{
            backgroundColor: 'var(--color-dark-700)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '20px 40px',
          }}
        >
          <TabSwitcher
            tabs={languageTabs}
            activeTab={activeTab}
            setActiveTab={setLanguageHandler}
          />
          <TabSwitcher
            activeTab={deckFilterData.activeTab}
            label={t('showDecksCards')}
            setActiveTab={() => {}}
            tabs={currentLanguage === 'en' ? decksTabsEN : decksTabsRU}
          />
          <Slider
            label={t('numberOfCards')}
            onValueChange={() => {}}
            value={deckFilterData.sliderValues}
          />
          <Button variant={'secondary'} onClick={() => {}}>
            <Icon srcIcon={deleteIcon} />
            <Typography variant={'subtitle2'}>{t('clearFilter')}</Typography>
          </Button>
        </div>
      </Drawer>
    </>
  )
}
