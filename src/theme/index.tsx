import { useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useWhitelabelStore } from 'src/store/whitelabel.store';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { primaryColor, secondaryColor } = useWhitelabelStore();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: secondaryColor,
          },
        },
        typography: {
          fontFamily: 'Inter, Arial, sans-serif',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily: 'Inter, Arial, sans-serif',
              },
            },
          },
        },
      }),
    [primaryColor, secondaryColor]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}