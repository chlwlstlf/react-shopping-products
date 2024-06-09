import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ToastProvider from './context/ToastProvider';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductListPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
