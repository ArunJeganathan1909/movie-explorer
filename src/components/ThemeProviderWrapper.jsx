import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeProviderWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#fafafa',
              paper: '#fff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
