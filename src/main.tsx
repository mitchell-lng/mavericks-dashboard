import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { Dashboard, Settings, Oops, Login, Register } from './pages'

import { AuthProvider } from './hooks/Auth'
import { ProtectedRoute } from './components'

import { DataProvider } from './hooks/DataContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <DataProvider>
          <Outlet />
        </DataProvider>
      </AuthProvider>
    ),
    errorElement: <Oops />,
    children: [
      { index: true, element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard>
              <div className='subpage-container'>
               <Outlet />
              </div>
            </Dashboard>
          </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Dashboard.home /> },
            { path: 'leaderboard', element: <Dashboard.leaderboard /> },
            { path: 'players', element: <Dashboard.players /> },
            { path: 'upload', element: <Dashboard.upload /> },
            { path: 'player/:id', element: <Dashboard.player /> },
            { path: 'compare', element: <Dashboard.compare /> }
          ],

      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        )
      }
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
