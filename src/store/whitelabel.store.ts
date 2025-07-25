import { create } from 'zustand';
import axios, { endpoints } from 'src/utils/axios';

interface WhitelabelState {
  loading: boolean;
  siteName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fetchWhitelabel: (site: string) => Promise<void>;
}

export const useWhitelabelStore = create<WhitelabelState>((set) => ({
  loading: true,
  siteName: '',
  logo: '',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  
  fetchWhitelabel: async (site: string) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${endpoints.whitelabel}?site=${site}`);
      const data = response.data;
      
      set({
        siteName: data.siteName || 'CMS Panel',
        logo: data.logo || '',
        primaryColor: data.primaryColor || '#1976d2',
        secondaryColor: data.secondaryColor || '#dc004e',
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching whitelabel:', error);
      set({
        siteName: 'CMS Panel',
        logo: '',
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        loading: false,
      });
    }
  },
}));