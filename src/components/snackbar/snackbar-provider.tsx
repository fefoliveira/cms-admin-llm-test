import { SnackbarProvider as NotistackProvider } from 'notistack';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  return (
    <NotistackProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </NotistackProvider>
  );
}