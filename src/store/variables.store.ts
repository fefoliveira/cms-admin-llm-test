import { create } from "zustand";
import { Variable, VariableState } from "../types";
import axios, { endpoints } from "../utils/axios";
import { variablesMock } from "../mocks";

interface VariableStore extends VariableState {
  fetchVariables: () => Promise<void>;
  setOrder: (order: "asc" | "desc") => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useVariablesStore = create<VariableStore>((set) => ({
  variables: [],
  loading: false,
  error: null,
  order: "asc",
  orderBy: "name",
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchVariables: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(endpoints.variables);
      set({ variables: response.data || variablesMock, loading: false });
    } catch (error: unknown) {
      console.warn("API request failed, using mock data:", error);
      set({ variables: variablesMock, loading: false, error: null });
    }
  },

  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setDense: (dense) => set({ dense }),
  toggleNewCondition: () =>
    set((state) => ({ newConditionToggle: !state.newConditionToggle })),
}));
