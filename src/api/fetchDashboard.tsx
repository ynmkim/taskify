import { instance as axios } from '@/libs/axios';
import { parse } from 'cookie';

export async function getDashboards() {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;
  const query = `navigationMethod=pagination`;
  // const query = `navigationMethod=pagination&cursor=${cursor}&limit=${limit}`;

  const res = await axios.get(`/dashboards?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const body = res.data;

  return body;
}

export async function createDashboard(data: { title: string; color: string }) {
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;

  const res = await axios
    .post('/dashboards', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status === 201) {
        alert('대시보드가 생성되었습니다.');
      }
    })
    .catch((error) => {
      console.log('Error', error.message);
    });
}
