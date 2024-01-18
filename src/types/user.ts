import { UserRoles } from './enums';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  role: UserRoles;
};

export type UserFilters = {
  page: number;
  limit: number;
  search: string;
};

export type GetUsersResponse = {
  totalCount: number;
  data: User[];
  limit: number;
  page: number;
};
