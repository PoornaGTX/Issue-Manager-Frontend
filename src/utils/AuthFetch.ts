// AuthFetch.js
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { getStore } from './storeInjector';
import { logOut } from '../features/user/AuthSlice';

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  (config) => {
    const store = getStore();
    if (store) {
      const { Auth } = store.getState();
      config.headers.Authorization = `Bearer ${Auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const store = getStore();
    if (store) {
      if (error.response.status === 401) {
        store.dispatch(logOut());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
