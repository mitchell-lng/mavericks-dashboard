import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { Dashboard, Settings, Oops, Login, Register } from './pages'
import { Player, Players, Upload, Leaderboard, DashboardHome } from './pages/dashboard/subpages'

import { AuthProvider } from './hooks/Auth'
import { ProtectedRoute } from './pages/dashboard/components'

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
            { index: true, element: <DashboardHome /> },
            { path: 'leaderboard', element: <Leaderboard /> },
            {
              path: 'players',
              element: <Players />
            },
            { path: 'upload', element: <Upload /> },
            { 
              path: 'player/:id',
              element: <Player />,
            },
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
