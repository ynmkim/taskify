import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';
import { useCallback } from 'react';
import { Column } from '@/types/DashboardType';

export default function useGetColum(dashboardId: number) {
  const getDashboards = useCallback(() => axiosAuthInstance().get(`columns?dashboardId=${dashboardId}`), [dashboardId]);

  const { execute, error, data } = useAsync(getDashboards, true);

  const columns: Column[] = data?.data;

  return {
    execute,
    error,
    columns,
  };
}
