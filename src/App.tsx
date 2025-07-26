/* eslint-disable perfectionist/sort-imports */
import './global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import { useEffect } from 'react';
import { useWhitelabelStore } from './store/whitelabel.store';
import { SplashScreen } from './components/loading-screen';
import { BrowserRouter } from 'react-router-dom';

// ----------------------------------------------------------------------

const App = () => {
  useScrollToTop();

  const { loading, fetchWhitelabel } = useWhitelabelStore();

  const getSiteName = () => {
    try {
      const { hostname, port } = window.location;
      if (port) {
        return `${hostname}:${port}`;
      }
      return hostname;
    } catch {
      return '';
    }
  };

  useEffect(() => {
    fetchWhitelabel(getSiteName());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <BrowserRouter>
      <AuthProvider>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <Router />
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
