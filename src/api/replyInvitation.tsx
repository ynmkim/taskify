import axios from 'axios';
import { parse } from 'cookie';
import { instance } from '@/libs/axios';
import { INVITATION_URL } from '@/constants/apiUrl';

export default async function replyInvitation(invitationId: number, inviteAccepted: boolean) {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;

  try {
    return await instance.put(
      INVITATION_URL + `/${invitationId}`,
      { inviteAccepted },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }
}
