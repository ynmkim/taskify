import axios from 'axios';
import { accessToken } from './network';

export const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-10',
  timeout: 1000,
});

export const axiosAuthInstance = () => {
  const instance = axios.create({
    baseURL: 'https://sp-taskify-api.vercel.app/2-10/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(
    (config) => {
      const token = accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.defaults.timeout = 2500;
  return instance;
};
