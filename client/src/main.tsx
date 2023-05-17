import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrack from './routes/CreateTrack/CreateTrack.tsx'
import Root from './routes/root.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store';
import HomePage from './routes/HomePage/HomePage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/createTrack',
                element: <CreateTrack />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
