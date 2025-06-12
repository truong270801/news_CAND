import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DefaultLayout from '../layout/DefaultLayout';

// Lazy load pages
const AdminDashboard = React.lazy(() => import('../page/admin/Home'));
const ClientHome = React.lazy(() => import('../page/client/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <DefaultLayout>
            <ClientHome />
          </DefaultLayout>
        ),
      },
      {
        path: '/admin',
        element: (
          <DefaultLayout>
            <AdminDashboard />
          </DefaultLayout>
        ),
      },
    ],
  },
]);

export default router;
