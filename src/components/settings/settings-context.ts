import { createContext } from "react";

// ----------------------------------------------------------------------

export type SettingsContextType = {
  themeMode: "light" | "dark";
  themeDirection: "ltr" | "rtl";
  themeContrast: "default" | "bold";
  themeLayout: "vertical" | "horizontal" | "mini";
  themeColorPresets: string;
  themeStretch: boolean;
};

export const SettingsContext = createContext<SettingsContextType>({
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "vertical",
  themeColorPresets: "default",
  themeStretch: false,
});
