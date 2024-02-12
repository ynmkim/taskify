import axios from 'axios';

export const axiosAuthInstance = () => {
  const instance = axios.create({
    baseURL: 'https://sp-taskify-api.vercel.app/2-10/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
  // 이 시간 동안 응답이 오지 않으면 요청은 실패한 것으로 간주
  instance.defaults.timeout = 2500;
  return instance;
};
