import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';
import AdminLayout from '../layouts/admin';
import PublishedAnnouncements from '../pages/admin/announcements/list';
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
      },
      {
        path: 'announcements/published',
        element: <PublishedAnnouncements />
      }
    ]
  }
];
