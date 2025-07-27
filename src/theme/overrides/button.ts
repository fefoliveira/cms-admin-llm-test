import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.grey[700],
          },
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[300]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}