import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrack from 'src/routes/CreateTrack/CreateTrack.tsx'
import Root from 'src/routes/root.tsx'
import { Provider } from 'react-redux'
import { store } from 'src/app/store';
import HomePage from 'src/routes/HomePage/HomePage.tsx'
import { NAV_ROUTES } from 'src/data/navigation.data'
import DisplayTrack from './routes/DisplayTrack/DisplayTrack'

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
                path: NAV_ROUTES.createTrack,
                element: <CreateTrack />,
            },
            {
                path: NAV_ROUTES.displayTrack,
                element: <DisplayTrack />,
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
) 
