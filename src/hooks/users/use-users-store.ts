import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { usersApi } from '../../api/users';
import { UserFilters } from '../../types/user';
import { useAuth } from '../use-auth';

export const useUsersStore = () => {
  const [filters, setFilters] = useState<UserFilters>({
    page: 0,
    limit: 10,
    search: ''
  });
  const auth = useAuth();
  const queryKey = useMemo(() => ['users', filters], [filters]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () => {
      if (auth.accessToken) {
        return usersApi.getUsers(auth.accessToken, filters);
      } else {
        return Promise.reject('No access token');
      }
    },
    enabled: !!auth.accessToken
  });

  const handleFiltersChange = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    filters,
    isFetching,
    handleFiltersChange
  };
};
