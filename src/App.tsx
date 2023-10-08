import { Router } from '@/Router.tsx'
import { Provider } from 'react-redux'
import { store } from '@/services/store.ts'
import { Header } from '@/components/ui/header'

export function App() {
  return (
    <Provider store={store}>
      <Header isAuth />
      <Router />
    </Provider>
  )
}
