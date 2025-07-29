import { create } from "zustand";
import { Variable, VariableState } from "../types";
import axios, { endpoints } from "../utils/axios";
import { variablesMock } from "../mocks";

interface VariableStore extends VariableState {
  fetchVariables: () => Promise<void>;
  createVariable: (
    variable: Omit<Variable, "id" | "createdAt">
  ) => Promise<void>;
  updateVariable: (id: string, variable: Partial<Variable>) => Promise<void>;
  deleteVariable: (id: string) => Promise<void>;
  setOrder: (order: "asc" | "desc") => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useVariablesStore = create<VariableStore>((set, get) => ({
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

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await axios.get(endpoints.variables);
      set({ variables: response.data || variablesMock, loading: false });
    } catch (error: unknown) {
      console.warn("API request failed, using mock data:", error);

      // Simulate API call delay even for mock data
      await new Promise((resolve) => setTimeout(resolve, 200));

      set({ variables: variablesMock, loading: false, error: null });
    }
  },

  createVariable: async (variable) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(endpoints.variables, variable);
      const currentVariables = get().variables;
      set({
        variables: [...currentVariables, response.data],
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate creation with mock data
      const newVariable: Variable = {
        ...variable,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      const currentVariables = get().variables;
      set({
        variables: [...currentVariables, newVariable],
        loading: false,
        error: null,
      });
    }
  },

  updateVariable: async (id, variable) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(
        `${endpoints.variables}/${id}`,
        variable
      );
      const currentVariables = get().variables;
      set({
        variables: currentVariables.map((v) =>
          v.id === id ? response.data : v
        ),
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate update with mock data
      const currentVariables = get().variables;
      set({
        variables: currentVariables.map((v) =>
          v.id === id ? { ...v, ...variable } : v
        ),
        loading: false,
        error: null,
      });
    }
  },

  deleteVariable: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.delete(`${endpoints.variables}/${id}`);
      const currentVariables = get().variables;
      set({
        variables: currentVariables.filter((v) => v.id !== id),
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate deletion with mock data
      const currentVariables = get().variables;
      set({
        variables: currentVariables.filter((v) => v.id !== id),
        loading: false,
        error: null,
      });
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
