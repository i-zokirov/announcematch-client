import { AnnouncementStatus } from '../types/enums';

export const getAnnouncementStatusColor = (status: AnnouncementStatus) => {
  switch (status) {
    case AnnouncementStatus.Published:
      return 'success';
    case AnnouncementStatus.AcceptedProposal:
      return 'error';

    case AnnouncementStatus.Archived:
      return 'info';

    case AnnouncementStatus.Draft:
      return 'warning';

    default:
      return 'info';
  }
};
