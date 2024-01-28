import axios from 'axios';
import { SignUpData } from '../../type';
import { SIGNUP_URL } from '@/constants/apiUrl';

export default function useSignUp() {
  const signUp = async (data: SignUpData) => {
    const { email, password, nickname } = data;

    try {
      await axios.post(SIGNUP_URL, { email, password, nickname });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        alert(errorMessage);
      }
      return false;
    }
  };

  return signUp;
}
