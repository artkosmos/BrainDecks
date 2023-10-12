import { Router } from '@/Router.tsx'
import { Provider } from 'react-redux'
import { store } from '@/services/store.ts'
import { CSSProperties } from 'react'
import s from './App.module.scss'

export function App() {
  const tempStyles = {
    display: 'flex',
    flexDirection: 'column' as CSSProperties['flexDirection'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: '50px',
  }

  return (
    <div style={tempStyles} className={s.appcontainer}>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}
