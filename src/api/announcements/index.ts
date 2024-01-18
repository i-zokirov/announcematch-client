import { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { AnnouncementsFilter, GetPublishedAnnouncementsResponse } from '../../types/announcement';
import { apiUrl } from '../apiUrl';

export class AnnouncementsApi {
  constructor(private readonly api: AxiosInstance = apiUrl) {}

  async getPublishedAnnouncements(access_token: string, filters: AnnouncementsFilter) {
    try {
      const path = [`/announcements/published?limit=${filters.limit}`];

      if (filters.search) {
        path.push(`&search=${filters.search}`);
      }

      if (filters.page) {
        path.push(`&page=${filters.page + 1}`);
      }

      if (filters.category_id) {
        path.push(`&category_id=${filters.category_id}`);
      }

      const result = await this.api.get(path.join('&'), {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      return result.data as GetPublishedAnnouncementsResponse;
    } catch (error: any) {
      const errormessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
      toast.error(errormessage);
      throw new Error(errormessage);
    }
  }
}

export const announcementsApi = new AnnouncementsApi();
