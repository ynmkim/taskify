import axios from 'axios';
import { parse } from 'cookie';
import { instance } from '@/libs/axios';
import { INVITATION_URL } from '@/constants/apiUrl';

export default async function fetchInvitation(cursorId: number) {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;

  try {
    const response = await instance.get(INVITATION_URL + `?size=5&cursorId=${cursorId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const invitationData = response.data;
    console.log(`beforeLastId=${cursorId}`, invitationData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    }
  }
}
