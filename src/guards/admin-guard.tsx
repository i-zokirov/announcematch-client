import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';
import { UserRoles } from '../types/enums';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: FC<AdminAuthGuardProps> = ({ children }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { user, isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  const check = useCallback(() => {
    if (!isInitialized) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    check();
    if (checked) {
      if (!isAuthenticated || !user) {
        navigate('/login');
      } else if (user && user.role !== UserRoles.Admin) {
        navigate('/');
      }
    }
  }, [isAuthenticated, checked, navigate, user, check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
