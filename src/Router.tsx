import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { DeckPackPage } from '@/features/deck-pack-page'
import { Card } from '@/components/ui/card'
import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>Login a little boy</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DeckPackPage />,
  },
  {
    path: '/card',
    element: (
      <Card>
        <PersonalInformation />
      </Card>
    ),
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
