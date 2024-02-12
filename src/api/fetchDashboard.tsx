import { instance as axios } from '@/libs/axios';
import { parse } from 'cookie';

export async function getDashboards(navigationMethod: string, size?: number, page?: number) {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;

  const res = await axios.get('/dashboards', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      navigationMethod: navigationMethod,
      size: size,
      page: page,
    },
  });

  const body = res.data;
  return body;
}

export async function postDashboard(data: { title: string; color: string }) {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;

  try {
    const res = await axios.post('/dashboards', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      alert('대시보드가 생성되었습니다.');
    }

    const dashboardId = res.data.id;
    return dashboardId;
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
  }
}
