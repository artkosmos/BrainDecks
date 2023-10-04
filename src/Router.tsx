import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { PersonalInformation } from '@/components/ui/personalInfo/PersonalInformation.tsx'
import { ForgotPasswordForm } from '@/components/auth/forgot-pasword-form'

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
    element: <ForgotPasswordForm onSubmit={() => {}} />,
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
