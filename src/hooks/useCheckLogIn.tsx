import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'cookie';

export default function useCheckLogIn() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parse(document.cookie);
    const accessToken = cookies.accessToken;

    if (accessToken) {
      router.push('/mydashboard');
    }
  }, []);
}
