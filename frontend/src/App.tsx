import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import ErrorPage from './pages/ErrorPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',                    // Ruta raíz
    errorElement: <ErrorPage />,  // Página de error para rutas no encontradas
    children: [                   // Rutas hijas
      {
        index: true,              // Ruta por defecto (/)
        element: <Login />        // Renderiza Login
      },
      {
        path: 'home',            // Ruta /home
        element: <Home />        // Renderiza Home
      },
      {
        path: 'reports',         // Ruta /reports
        element: <Reports />     // Renderiza Reports
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
