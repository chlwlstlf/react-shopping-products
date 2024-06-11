import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ToastProvider from './context/ToastProvider';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductListPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
