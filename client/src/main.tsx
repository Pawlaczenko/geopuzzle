import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrack from 'src/routes/CreateTrack/CreateTrack.tsx'
import Root from 'src/routes/root.tsx'
import { Provider } from 'react-redux'
import { store } from 'src/app/store';
import HomePage from 'src/routes/HomePage/HomePage.tsx'
import { NAV_ROUTES } from 'src/data/navigation.data'
import CreateTrackInfo from './routes/CreateTrack/CreateTrackInfo'
import CreateTrackddPoint from './routes/CreateTrack/CreateTrackPoint'

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
                children: [
                    {
                        index: true,
                        element: <CreateTrackInfo />,
                    },
                    {
                        path: NAV_ROUTES.createTrack+'/waypoint',
                        element: <CreateTrackddPoint />
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
) 
