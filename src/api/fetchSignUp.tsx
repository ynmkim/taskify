import axios from 'axios';
import { instance } from '@/libs/axios';
import { SignUpFormData } from '@/types/AuthType';
import { SIGNUP_URL } from '@/constants/apiUrl';

export default function fetchSignUp() {
  const signUp = async (data: SignUpFormData) => {
    const { email, password, nickname } = data;

    try {
      return await instance.post(SIGNUP_URL, { email, password, nickname });
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
