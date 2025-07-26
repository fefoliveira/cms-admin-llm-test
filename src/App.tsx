import "./global.css";

// ----------------------------------------------------------------------

import Router from "./routes/sections";

import { useScrollToTop } from "./hooks/use-scroll-to-top";

import ThemeProvider from "./theme";

import ProgressBar from "./components/progress-bar";
import { MotionLazy } from "./components/animate/motion-lazy";
import SnackbarProvider from "./components/snackbar/snackbar-provider";
import { SettingsDrawer, SettingsProvider } from "./components/settings";

import { AuthProvider } from "./auth/context/jwt";
import { SplashScreen } from "./components/loading-screen";
import { BrowserRouter } from "react-router-dom";

// ----------------------------------------------------------------------

const AppContent = () => {
  useScrollToTop();
  return <Router />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: "light", // 'light' | 'dark'
            themeDirection: "ltr", //  'rtl' | 'ltr'
            themeContrast: "default", // 'default' | 'bold'
            themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                <AppContent />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
