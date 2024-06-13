import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from '../context/ToastProvider';

export const createWrapper =
  () =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <QueryClientProvider client={new QueryClient()}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    );
