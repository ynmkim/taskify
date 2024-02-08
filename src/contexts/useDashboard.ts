import { getDashboard } from '@/libs/network';
import { Dashboard } from '@/types/DashboardType';
import { create } from 'zustand';

interface UseDashboard {
  dashboards: Dashboard[];
  isLoading:boolean;
  updateDashboards: () => void;
}

export const useDashboard = create<UseDashboard>((set) => ({
  dashboards: [],
  isLoading: false,

  updateDashboards: async () => {
    set({ isLoading: true });
    try {
      const data = await getDashboard();
      set({ dashboards: data });
    } catch (error) {
      alert(`대시보드 데이터 업데이트 실패:${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
}));
