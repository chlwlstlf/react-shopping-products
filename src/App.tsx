import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import { ToastContext } from './context/ToastProvider';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';
import { useContext } from 'react';

function App() {
  const { showToast } = useContext(ToastContext);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        showToast(error.message);
      },
    }),
  });

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
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
