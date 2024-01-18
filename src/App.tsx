import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router';
import 'src/global.css';
import { Toaster } from './components/toaster';
import { AuthConsumer, AuthProvider } from './contexts/auth';
import { routes } from './routes';
import { createTheme } from './theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const theme = createTheme({
    colorPreset: 'green',
    contrast: 'high',
    direction: 'ltr',
    paletteMode: 'light',
    responsiveFontSizes: true
  });
  const element = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => {
                const showSlashScreen = !auth.isInitialized;

                return showSlashScreen ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {' '}
                    {element} <Toaster />
                  </>
                );
              }}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
