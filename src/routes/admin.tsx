import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';
import AdminLayout from '../layouts/admin';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: (
      <AdminLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </AdminLayout>
    ),
    children: [
      {
        index: true,
        element: <div>Admin Home</div>
      }
    ]
  }
];
