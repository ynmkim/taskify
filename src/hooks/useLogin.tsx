import axios from 'axios';
import { LOGIN_URL } from '@/constants/apiUrl';
import { LoginFormData } from '../../type';

export default function useLogin() {
  const logIn = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      return await axios.post(LOGIN_URL, { email, password });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return errorMessage;
      }
    }
  };

  return logIn;
}
