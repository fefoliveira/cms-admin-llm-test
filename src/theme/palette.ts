import { alpha } from '@mui/material/styles';

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// Default palette (minimals.cc light mode)
export const defaultPalette = {
  primary: {
    lighter: '#C8FAD6',
    light: '#5BE49B',
    main: '#00A76F',
    dark: '#007867',
    darker: '#004B50',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff',
  },
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: '#919EAB',
  },
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  },
  grey: {
    '0': '#FFFFFF',
    '100': '#F9FAFB',
    '200': '#F4F6F8',
    '300': '#DFE3E8',
    '400': '#C4CDD5',
    '500': '#919EAB',
    '600': '#637381',
    '700': '#454F5B',
    '800': '#212B36',
    '900': '#161C24',
  },
  common: { black: '#000000', white: '#FFFFFF' },
};

export function palette(mode: 'light' | 'dark') {
  const grey = defaultPalette.grey;
  const primary = defaultPalette.primary;
  const secondary = defaultPalette.secondary;
  const info = defaultPalette.info;
  const warning = defaultPalette.warning;
  const success = defaultPalette.success;
  const error = defaultPalette.error;
  const common = defaultPalette.common;

  const action = {
    hover: alpha(grey['500'], 0.08),
    selected: alpha(grey['500'], 0.16),
    disabled: alpha(grey['500'], 0.8),
    disabledBackground: alpha(grey['500'], 0.24),
    focus: alpha(grey['500'], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  };

  const base = {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    grey,
    common,
    divider: alpha(grey['500'], 0.2),
    action,
  };

  const light = {
    ...base,
    mode: 'light',
    text: {
      primary: grey['800'],
      secondary: grey['600'],
      disabled: grey['500'],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: grey['200'],
    },
    action: {
      ...base.action,
      active: grey['600'],
    },
  };

  const dark = {
    ...base,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: grey['500'],
      disabled: grey['600'],
    },
    background: {
      paper: grey['800'],
      default: grey['900'],
      neutral: alpha(grey['500'], 0.12),
    },
    action: {
      ...base.action,
      active: grey['500'],
    },
  };

  return mode === 'light' ? light : dark;
}