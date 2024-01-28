import axios from 'axios';
import { FormData } from '../../type';
import { SIGNUP_URL } from '@/constants/apiUrl';

export default function useSignUp() {
  const signUp = (data: FormData) => {
    console.log(data);
  };

  return signUp;
}
