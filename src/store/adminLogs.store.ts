import { create } from 'zustand';
import { AdminLog, AdminLogState } from '../types';
import axios, { endpoints } from '../utils/axios';

interface AdminLogStore extends AdminLogState {
  fetchAdminLogs: () => Promise<void>;
  setOrder: (order: 'asc' | 'desc') => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useAdminLogsStore = create<AdminLogStore>((set) => ({
  adminLogs: [],
  loading: false,
  error: null,
  order: 'desc',
  orderBy: 'createdAt',
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchAdminLogs: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(endpoints.adminLogs);
      set({ adminLogs: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch admin logs', loading: false });
    }
  },

  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setDense: (dense) => set({ dense }),
  toggleNewCondition: () => set((state) => ({ newConditionToggle: !state.newConditionToggle })),
}));