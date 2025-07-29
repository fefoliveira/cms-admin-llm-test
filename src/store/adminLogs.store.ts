import { create } from "zustand";

import axios, { endpoints } from "src/utils/axios";
import { adminLogsMock } from "src/mocks";

import { AdminLog, AdminLogState } from "src/types/admin-logs";

type Actions = {
  setOrder: (order: "desc" | "asc") => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  setNewConditionToggle: (newConditionToggle: boolean) => void;
  setLoading: (loading: boolean) => void;
  fetchAdminLogs: () => Promise<void>;
};

const initialValues: AdminLogState = {
  adminLogs: [],
  loading: false,
  error: null,
  order: "desc",
  orderBy: "createdAt",
  page: 0,
  rowsPerPage: 5,
  dense: false,
  newConditionToggle: false,
};

export const useAdminLogsStore = create<AdminLogState & Actions>((set) => ({
  ...initialValues,

  setOrder: (order: "desc" | "asc") => set({ order }),

  setOrderBy: (orderBy: string) => set({ orderBy }),

  setPage: (page: number) => set({ page }),

  setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),

  setDense: (dense: boolean) => set({ dense }),

  setNewConditionToggle: (newConditionToggle: boolean) =>
    set({ newConditionToggle }),

  setLoading: (loading: boolean) => set({ loading }),

  fetchAdminLogs: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await axios.get(endpoints.adminLogs);
      set({ adminLogs: response.data || adminLogsMock, loading: false });
    } catch (error) {
      console.warn("API request failed, using mock data:", error);

      // Simulate API call delay even for mock data
      await new Promise((resolve) => setTimeout(resolve, 200));

      set({ adminLogs: adminLogsMock, loading: false, error: null });
    }
  },
}));
