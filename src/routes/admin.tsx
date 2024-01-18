import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';
import AdminLayout from '../layouts/admin';
import UsersPage from '../pages/admin/users/list';

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
      },
      {
        path: 'users',
        element: <UsersPage />
      }
    ]
  }
];
