import { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { Category } from '../../types/category';
import { apiUrl } from '../apiUrl';

export class CategoriesApi {
  constructor(private readonly api: AxiosInstance = apiUrl) {}

  async getCategories(access_token: string) {
    try {
      const result = await this.api.get('/categories', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      return result.data as Category[];
    } catch (error: any) {
      const errormessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
      toast.error(errormessage);
      throw new Error(errormessage);
    }
  }
}

export const categoriesApi = new CategoriesApi();
