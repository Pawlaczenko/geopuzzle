import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateRoute from './routes/CreateRoute/CreateRoute.tsx'
import Root from './routes/root.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store';

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
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
