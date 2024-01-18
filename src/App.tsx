import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRoutes } from 'react-router';
import 'src/global.css';
import { AuthConsumer, AuthProvider } from './contexts/auth';
import { routes } from './routes';
import { createTheme } from './theme';

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
      {element}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => {
              const showSlashScreen = !auth.isInitialized;

              return showSlashScreen ? <div>Loading...</div> : element;
            }}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
