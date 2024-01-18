import { Announcement } from './announcement';
import { ProposalStatus } from './enums';
import { User } from './user';

export type Porposal = {
  id: string;
  description: string;
  price: number;
  status: ProposalStatus;
  durationType: string;
  duration: number;
  createdBy: User;
  announcement: Announcement;
  createdAt: string;
  updatedAt: string;
};
