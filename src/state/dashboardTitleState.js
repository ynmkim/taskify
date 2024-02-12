import create from 'zustand';

const useStore = create(set => ({
  dashboardTitle: '',
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
}));

export default useStore;
