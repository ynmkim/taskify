import axios from 'axios';
import { getHeader } from './network';

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
      const token = getHeader();
      if (token) {
        config.headers.Authorization = token.Authorization;
      }
      return config;
    },
    (error) => {
      console.log('interceptor>error', error);
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('interceptor>error', error);
      return Promise.reject(error);
    },
  );

  instance.defaults.timeout = 2500;
  return instance;
}; 
