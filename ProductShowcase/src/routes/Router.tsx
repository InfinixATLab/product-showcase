import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { DetailsPage } from '../pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/pokemon/:name',
    element: <DetailsPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};