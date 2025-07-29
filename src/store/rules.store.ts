import { create } from "zustand";
import { Rule, RuleState, RuleUpdatePayload } from "../types";
import axios, { endpoints } from "../utils/axios";
import { rulesMock } from "../mocks";

interface RuleStore extends RuleState {
  fetchRules: () => Promise<void>;
  createRule: (rule: Omit<Rule, "id" | "createdAt">) => Promise<void>;
  updateRule: (id: string, rule: RuleUpdatePayload) => Promise<void>;
  inactivateRule: (id: string) => Promise<void>;
  setOrder: (order: "asc" | "desc") => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useRulesStore = create<RuleStore>((set, get) => ({
  rules: [],
  loading: false,
  error: null,
  order: "asc",
  orderBy: "name",
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchRules: async () => {
    try {
      set({ loading: true, error: null });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await axios.get(endpoints.rules.getAll);
      set({ rules: response.data || rulesMock, loading: false });
    } catch (error: unknown) {
      console.warn("API request failed, using mock data:", error);

      // Simulate API call delay even for mock data
      await new Promise((resolve) => setTimeout(resolve, 200));

      set({ rules: rulesMock, loading: false, error: null });
    }
  },

  createRule: async (rule) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(endpoints.rules.create, rule);
      const currentRules = get().rules;
      set({
        rules: [...currentRules, response.data],
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate creation with mock data
      const newRule: Rule = {
        ...rule,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      const currentRules = get().rules;
      set({
        rules: [...currentRules, newRule],
        loading: false,
        error: null,
      });
    }
  },

  updateRule: async (id, rule) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(`${endpoints.rules.update}/${id}`, rule);
      const currentRules = get().rules;
      set({
        rules: currentRules.map((r) => (r.id === id ? response.data : r)),
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate update with mock data
      const currentRules = get().rules;
      const updatedRule: Partial<Rule> = {
        ...rule,
        effect: rule.effect
          ? {
              type: rule.effect.type,
              value: parseFloat(rule.effect.value) || 0,
            }
          : undefined,
      };
      set({
        rules: currentRules.map((r) =>
          r.id === id ? { ...r, ...updatedRule } : r
        ),
        loading: false,
        error: null,
      });
    }
  },

  inactivateRule: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.put(`${endpoints.rules.inactivate}/${id}`);
      const currentRules = get().rules;
      set({
        rules: currentRules.map((r) =>
          r.id === id ? { ...r, status: "inactive" } : r
        ),
        loading: false,
      });
    } catch (error: unknown) {
      // Simulate inactivation with mock data
      const currentRules = get().rules;
      set({
        rules: currentRules.map((r) =>
          r.id === id ? { ...r, status: "inactive" as const } : r
        ),
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
