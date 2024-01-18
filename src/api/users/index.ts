import { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { GetUsersResponse, UserFilters } from '../../types/user';
import { apiUrl } from '../apiUrl';

export class UsersApi {
  constructor(private readonly api: AxiosInstance = apiUrl) {}

  async getUsers(access_token: string, filters: UserFilters) {
    try {
      const path = [`/users?limit=${filters.limit}`];

      if (filters.search) {
        path.push(`&search=${filters.search}`);
      }

      if (filters.page) {
        path.push(`&page=${filters.page + 1}`);
      }

      const result = await this.api.get(path.join('&'), {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      return result.data as GetUsersResponse;
    } catch (error: any) {
      const errormessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
      toast.error(errormessage);
      throw new Error(errormessage);
    }
  }
}

export const usersApi = new UsersApi();
