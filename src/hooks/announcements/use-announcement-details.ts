import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { announcementsApi } from '../../api/announcements';
import { useAuth } from '../use-auth';

export const useAnnouncementDetails = () => {
  const auth = useAuth();
  const { announcement_id } = useParams();

  const queryKey = useMemo(() => ['announcement', announcement_id], [announcement_id]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () => {
      if (auth.accessToken && announcement_id) {
        return announcementsApi.getAnnouncementById(auth.accessToken, announcement_id);
      } else {
        return Promise.reject();
      }
    },
    enabled: !!auth.accessToken && !!announcement_id
  });

  return {
    queryResult: {
      data,
      isLoading,
      isError,
      error,
      isFetching
    }
  };
};
