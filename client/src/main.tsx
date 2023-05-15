import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/globalStyles.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateRoute from './routes/CreateRoute/CreateRoute.tsx'
import Root from './routes/root.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <CreateRoute />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
)
