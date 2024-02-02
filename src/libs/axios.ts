import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-10',
  timeout: 1000,
});
