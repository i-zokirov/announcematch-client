import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';
import AdminLayout from '../layouts/admin';
import AnnouncementDetailsPage from '../pages/admin/announcements/details';
import UsersPage from '../pages/admin/users/list';
import PublishedAnnouncements from '../pages/general/announcements/list';

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
      },
      {
        path: 'announcements/:announcement_id',
        element: <AnnouncementDetailsPage />
      }
    ]
  }
];
