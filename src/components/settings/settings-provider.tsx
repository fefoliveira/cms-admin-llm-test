import { SettingsContext, type SettingsContextType } from "./settings-context";

// ----------------------------------------------------------------------

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
