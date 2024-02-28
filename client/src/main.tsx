import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrack from 'src/routes/CreateTrack/CreateTrack.tsx'
import Root from 'src/routes/root.tsx'
import { Provider } from 'react-redux'
import { store } from 'src/app/store';
import HomePage from 'src/routes/HomePage/HomePage.tsx'
import { NAV_ROUTES } from 'src/data/navigation.data'
import ViewTrack from './routes/DisplayTrack/ViewTrack'
import LoginPage from './routes/Login/Login'
import RegisterForm from './components/RegisterForm/RegisterForm'
import ExploreTracks from './routes/DisplayTrack/ExploreTracks'

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
                element: <ExploreTracks />,
            },
            {
                path: NAV_ROUTES.displayTrack + '/:track_id',
                element: <ViewTrack />,
            },
            {
                path: NAV_ROUTES.login,
                element: <LoginPage />,
            },
            {
                path: NAV_ROUTES.register,
                element: <RegisterForm />,
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
) 
