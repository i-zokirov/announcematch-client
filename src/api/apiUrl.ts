import axios from 'axios';
import { API_URL } from '../config';

export const apiUrl = axios.create({
  baseURL: API_URL,
  withCredentials: false
});

apiUrl.defaults.headers.common['Content-Type'] = 'application/json';
