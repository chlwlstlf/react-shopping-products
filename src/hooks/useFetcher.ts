import { useState, useContext } from 'react';
import { ToastContext } from '../context/ToastProvider';

interface UseFetcherResult {
  loading: boolean;
  error: unknown;
  fetcher: (callback: () => Promise<void>) => Promise<void>;
}

const useFetcher = (): UseFetcherResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { showToast } = useContext(ToastContext);

  const fetcher = async (callback: () => Promise<void>) => {
    setLoading(true);
    try {
      await callback();
    } catch (error) {
      setError(true);
      if (error instanceof Error) showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetcher };
};

export default useFetcher;
