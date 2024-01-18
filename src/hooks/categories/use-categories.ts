import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../../api/categories';
import { useAuth } from '../use-auth';

export const useCategories = () => {
  const auth = useAuth();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      if (auth.accessToken) {
        return categoriesApi.getCategories(auth.accessToken);
      } else {
        return Promise.reject('No access token');
      }
    }
  });

  return {
    categories: data ?? [],
    isLoading,
    isError,
    error,
    isFetching
  };
};
