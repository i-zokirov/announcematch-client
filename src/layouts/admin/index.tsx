import { Container } from '@mui/material';
import { FC } from 'react';
import Navbar from '../../components/navbar';
import { withAdminAuthGuard } from '../../hocs/with-admin-auth-guard';
import { useAuth } from '../../hooks/use-auth';
import { UserRoles } from '../../types/enums';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = withAdminAuthGuard(({ children }) => {
  const { user } = useAuth();
  return (
    <main>
      <Navbar role={user?.role ?? UserRoles.Contributor} />
      <Container
        maxWidth="xl"
        sx={{ my: 4 }}
      >
        {children}
      </Container>
    </main>
  );
});

export default AdminLayout;
