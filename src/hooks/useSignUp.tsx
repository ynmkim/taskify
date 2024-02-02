import axios from 'axios';
import { SignUpFormData } from '../../type';
import { SIGNUP_URL } from '@/constants/apiUrl';

export default function useSignUp() {
  const signUp = async (data: SignUpFormData) => {
    const { email, password, nickname } = data;

    try {
      return await axios.post(SIGNUP_URL, { email, password, nickname });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return errorMessage;
      }
      return false;
    }
  };

  return signUp;
}
