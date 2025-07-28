import { create } from 'zustand';
import { Rule, RuleState, RuleUpdatePayload } from '../types';
import axios, { endpoints } from '../utils/axios';

interface RuleStore extends RuleState {
  fetchRules: () => Promise<void>;
  createRule: (rule: Omit<Rule, 'id' | 'createdAt'>) => Promise<void>;
  updateRule: (id: string, rule: RuleUpdatePayload) => Promise<void>;
  inactivateRule: (id: string) => Promise<void>;
  setOrder: (order: 'asc' | 'desc') => void;
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
  order: 'asc',
  orderBy: 'name',
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchRules: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(endpoints.rules.getAll);
      const { rulesMock } = await import('src/mocks/rules.mock');
      set({ rules: response.data || rulesMock, loading: false });
    } catch (error: any) {
      const { rulesMock } = await import('src/mocks/rules.mock');
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
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create rule', loading: false });
    }
  },

  updateRule: async (id, rule) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(`${endpoints.rules.update}/${id}`, rule);
      const currentRules = get().rules;
      set({ 
        rules: currentRules.map(r => r.id === id ? response.data : r),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update rule', loading: false });
    }
  },

  inactivateRule: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.put(`${endpoints.rules.inactivate}/${id}`);
      const currentRules = get().rules;
      set({ 
        rules: currentRules.map(r => r.id === id ? { ...r, status: 'inactive' } : r),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to inactivate rule', loading: false });
    }
  },

  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setDense: (dense) => set({ dense }),
  toggleNewCondition: () => set((state) => ({ newConditionToggle: !state.newConditionToggle })),
}));