import { alpha } from '@mui/material/styles';

import { defaultPalette } from '../palette';

// ----------------------------------------------------------------------

export function createContrast(themeContrast: 'default' | 'bold', themeMode: 'light' | 'dark') {
  const isLight = themeMode === 'light';
  const defaultColor = defaultPalette.grey[isLight ? 100 : 800];

  return {
    palette: {
      background: {
        default: themeContrast === 'bold' ? defaultPalette.grey[isLight ? 0 : 900] : defaultColor,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: themeContrast === 'bold' ? 'none' : undefined,
            border:
              themeContrast === 'bold'
                ? `1px solid ${alpha(defaultPalette.grey[500], 0.12)}`
                : undefined,
          },
        },
      },
    },
  };
}