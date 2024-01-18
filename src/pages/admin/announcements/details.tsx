import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import { useAnnouncementDetails } from '../../../hooks/announcements/use-announcement-details';
import AnnouncementDetailsSection from '../../../sections/announcements/details/details';

const AnnouncementDetailsPage = () => {
  const { queryResult } = useAnnouncementDetails();
  return (
    <div>
      {queryResult.isLoading ? (
        <CircularProgress />
      ) : queryResult.isError && queryResult.error ? (
        <Alert severity="error">{queryResult.error.message}</Alert>
      ) : queryResult.data ? (
        <div>
          <Stack
            spacing={1}
            sx={{ my: 2 }}
          >
            <Typography variant="h4">{queryResult.data.title}</Typography>
          </Stack>
          <AnnouncementDetailsSection announcement={queryResult.data} />
        </div>
      ) : (
        <Alert severity="error">No announcement found</Alert>
      )}
    </div>
  );
};

export default AnnouncementDetailsPage;
