import { createContext, useContext } from 'react';

// ----------------------------------------------------------------------

type SettingsContextType = {
  themeMode: 'light' | 'dark';
  themeDirection: 'ltr' | 'rtl';
  themeContrast: 'default' | 'bold';
  themeLayout: 'vertical' | 'horizontal' | 'mini';
  themeColorPresets: string;
  themeStretch: boolean;
};

const SettingsContext = createContext<SettingsContextType>({
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
  defaultSettings: SettingsContextType;
};

export function SettingsProvider({ children, defaultSettings }: Props) {
  return (
    <SettingsContext.Provider value={defaultSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function SettingsDrawer() {
  return null; // Placeholder for settings drawer
}