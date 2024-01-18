import { User } from './user';

export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  user: User;
};
