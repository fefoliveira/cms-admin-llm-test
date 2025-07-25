import { create } from 'zustand';
import { User, UserState, UserUpdatePayload } from 'src/types';
import axios, { endpoints } from 'src/utils/axios';

interface UserStore extends UserState {
  fetchUsers: () => Promise<void>;
  createUser: (user: UserUpdatePayload) => Promise<void>;
  updateUser: (id: string, user: UserUpdatePayload) => Promise<void>;
  inactivateUser: (id: string) => Promise<void>;
  setOrder: (order: 'asc' | 'desc') => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useUsersStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  order: 'asc',
  orderBy: 'displayName',
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(endpoints.adminUser.getAll);
      set({ users: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch users', loading: false });
    }
  },

  createUser: async (user) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(endpoints.adminUser.create, user);
      const currentUsers = get().users;
      set({ 
        users: [...currentUsers, response.data], 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create user', loading: false });
    }
  },

  updateUser: async (id, user) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(`${endpoints.adminUser.update}/${id}`, user);
      const currentUsers = get().users;
      set({ 
        users: currentUsers.map(u => u.id === id ? response.data : u),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update user', loading: false });
    }
  },

  inactivateUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.put(`${endpoints.adminUser.inactivate}/${id}`);
      const currentUsers = get().users;
      set({ 
        users: currentUsers.map(u => u.id === id ? { ...u, active: false } : u),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to inactivate user', loading: false });
    }
  },

  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setDense: (dense) => set({ dense }),
  toggleNewCondition: () => set((state) => ({ newConditionToggle: !state.newConditionToggle })),
}));