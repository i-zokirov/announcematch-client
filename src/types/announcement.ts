import { Category } from './category';
import { Porposal } from './proposal';
import { User } from './user';

export type Announcement = {
  id: string;
  title: string;
  description: string;
  status: string;
  image: string | null;
  expiresAt: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  acceptedProposal: Porposal | null;
  categories: Category[];
};

export type AnnouncementsFilter = {
  page: number;
  limit: number;
  search: string;
  category_id: string | null;
};

export type GetPublishedAnnouncementsResponse = {
  totalCount: number;
  data: Announcement[];
  limit: number;
  page: number;
};
