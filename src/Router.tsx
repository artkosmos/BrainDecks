import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { DeckPack } from '@/features/deck-pack'
import { Cards } from '@/features/cards/Cards.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>Login a little boy</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    // element: <div>Your component is shown here</div>,
    element: <Cards />,
  },
  {
    path: '/decks',
    element: <DeckPack />,
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
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}