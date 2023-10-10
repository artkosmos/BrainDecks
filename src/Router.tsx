import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { DeckPack } from '@/features/deck-pack'
import { Cards } from '@/features/cards/Cards.tsx'
import { Login } from '@/features/login'
import { useMeQuery } from '@/services/auth-service/auth-service.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DeckPack />,
  },
  {
    path: '/cards',
    element: <Cards />,
  },
]

const router = createBrowserRouter([
  { element: <PrivateRoutes />, children: privateRoutes },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }
  const isAuthorized = !isError

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />
}
