import { create } from 'zustand';
import { ConversionRate, ConversionRateState, ConversionRateUpdatePayload } from '../types';
import axios, { endpoints } from '../utils/axios';

interface ConversionRateStore extends ConversionRateState {
  fetchConversionRates: () => Promise<void>;
  createConversionRate: (rate: Omit<ConversionRate, 'id'>) => Promise<void>;
  updateConversionRate: (id: string, rate: ConversionRateUpdatePayload) => Promise<void>;
  inactivateConversionRate: (id: string) => Promise<void>;
  activateConversionRate: (id: string) => Promise<void>;
  setOrder: (order: 'asc' | 'desc') => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  toggleNewCondition: () => void;
}

export const useConversionRatesStore = create<ConversionRateStore>((set, get) => ({
  conversionRates: [],
  loading: false,
  error: null,
  order: 'asc',
  orderBy: 'name',
  page: 0,
  rowsPerPage: 10,
  dense: false,
  newConditionToggle: false,

  fetchConversionRates: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(endpoints.conversionRates.getAll);
      set({ conversionRates: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch conversion rates', loading: false });
    }
  },

  createConversionRate: async (rate) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(endpoints.conversionRates.create, rate);
      const currentRates = get().conversionRates;
      set({ 
        conversionRates: [...currentRates, response.data], 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create conversion rate', loading: false });
    }
  },

  updateConversionRate: async (id, rate) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(`${endpoints.conversionRates.update}/${id}`, rate);
      const currentRates = get().conversionRates;
      set({ 
        conversionRates: currentRates.map(r => r.id === id ? response.data : r),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update conversion rate', loading: false });
    }
  },

  inactivateConversionRate: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.put(`${endpoints.conversionRates.inactivate}/${id}`);
      const currentRates = get().conversionRates;
      set({ 
        conversionRates: currentRates.map(r => r.id === id ? { ...r, status: 'inactive' } : r),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to inactivate conversion rate', loading: false });
    }
  },

  activateConversionRate: async (id) => {
    try {
      set({ loading: true, error: null });
      await axios.put(`${endpoints.conversionRates.activate}/${id}`);
      const currentRates = get().conversionRates;
      set({ 
        conversionRates: currentRates.map(r => r.id === id ? { ...r, status: 'active' } : r),
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to activate conversion rate', loading: false });
    }
  },

  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setDense: (dense) => set({ dense }),
  toggleNewCondition: () => set((state) => ({ newConditionToggle: !state.newConditionToggle })),
}));