import { withAdminAuthGuard } from '../../hocs/with-admin-auth-guard';

const AdminLayout = withAdminAuthGuard(() => {
  return <div>AdminLayout</div>;
});

export default AdminLayout;
