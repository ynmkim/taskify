import { create, createStore } from 'zustand';

type User = {
  nickname: string;
  email: string;
  id: number;
};

type Dashboard = {
  title: string;
  id: number;
};

type Invitation = {
  id: number;
  inviter: User;
  teamId: string;
  dashboard: Dashboard;
  invitee: User;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

type InvitationData = {
  cursorId: number | null;
  invitations: Invitation[] | [];
};

interface InvitationStore {
  invitationData: InvitationData;
  setInvitationData: (data: InvitationData) => void;
}

export const useInvitationStore = create<InvitationStore>((set) => ({
  invitationData: { cursorId: null, invitations: [] },
  setInvitationData: (data: InvitationData) => set({ invitationData: data }),
}));
