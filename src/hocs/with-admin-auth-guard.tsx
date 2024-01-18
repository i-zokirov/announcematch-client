import type { FC } from 'react';
import AdminAuthGuard from '../guards/admin-guard';

export const withAdminAuthGuard = <P extends object>(Component: FC<P>): FC<P> => {
  return function WithAuthGuard(props: P) {
    return (
      <AdminAuthGuard>
        <Component {...props} />
      </AdminAuthGuard>
    );
  };
};
