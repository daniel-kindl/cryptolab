import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from '@/App';
import { cryptolabTheme, ThemeGlobalStyles } from '@/theme/cryptolabTheme';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={cryptolabTheme} defaultColorScheme='dark'>
      <ThemeGlobalStyles />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
