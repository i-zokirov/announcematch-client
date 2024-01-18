import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import { announcementsApi } from '../../api/announcements';
import { AnnouncementsFilter } from '../../types/announcement';
import { UserFilters } from '../../types/user';
import { useAuth } from '../use-auth';

export const usePublishedAnnouncementsStore = () => {
  const [filters, setFilters] = useState<AnnouncementsFilter>({
    page: 0,
    limit: 20,
    search: '',
    category_id: ''
  });
  const auth = useAuth();
  const queryKey = useMemo(() => ['announcements/published', filters], [filters]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () => {
      if (auth.accessToken) {
        return announcementsApi.getPublishedAnnouncements(auth.accessToken, filters);
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

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setFilters((prevState) => ({
      ...prevState,
      limit: parseInt(event.target.value, 10)
    }));
  }, []);

  const handlePageChange = useCallback((_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleCategoryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, category_id: event.target.value as string }));
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    filters,
    isFetching,
    handleFiltersChange,
    handleRowsPerPageChange,
    handlePageChange,
    handleCategoryChange
  };
};
