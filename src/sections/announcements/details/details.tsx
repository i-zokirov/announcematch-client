import { Card, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { PropertyListItem } from '../../../components/property-list-item';
import { Announcement } from '../../../types/announcement';

interface AnnouncementDetailsSectionProps {
  announcement: Announcement;
}

const AnnouncementDetailsSection: FC<AnnouncementDetailsSectionProps> = ({ announcement }) => {
  return (
    <Card sx={{ p: 2 }}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          md={6}
          item
        >
          <PropertyListItem
            divider
            label={'Status'}
            value={announcement.status}
            align={'horizontal'}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          item
        >
          <PropertyListItem
            divider
            label={'Expiry Date'}
            value={announcement.expiresAt ? dayjs(announcement.expiresAt).format('DD/MM/YYYY hh:mm') : 'No expiry date'}
            align={'horizontal'}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          item
        >
          <PropertyListItem
            divider
            label={'Created At'}
            value={dayjs(announcement.createdAt).format('DD/MM/YYYY hh:mm')}
            align={'horizontal'}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          item
        >
          <PropertyListItem
            divider
            label={'Created By'}
            value={announcement.createdBy?.firstName + ' ' + announcement.createdBy?.lastName}
            align={'horizontal'}
          />
        </Grid>
        <Grid
          xs={12}
          item
        >
          <PropertyListItem
            divider
            label={'Categories'}
            value={announcement.categories.map((category) => `#${category.name}`).join(', ')}
            align={'horizontal'}
          />
        </Grid>
        <Grid
          xs={12}
          item
        >
          <TextField
            fullWidth
            multiline
            rows={5}
            defaultValue={announcement.description}
            variant={'outlined'}
            disabled
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AnnouncementDetailsSection;
