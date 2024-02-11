import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';
import { useCallback } from 'react';
import { Card } from '@/types/DashboardType';

export default function useGetCards(id: number) {
  const getDashboards = useCallback(() => axiosAuthInstance().get(`cards?size=1000&columnId=${id}`), []);

  const { execute, error, data } = useAsync(getDashboards, false);

  const cards: Card[] = data?.cards;
  const totalCount: number = data?.totalCount;

  return {
    execute,
    error,
    cards,
    totalCount,
  };
}
