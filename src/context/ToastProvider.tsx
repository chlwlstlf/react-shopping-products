import { createContext, useRef, useState } from 'react';
import ErrorToast from '../components/ErrorToast/ErrorToast';

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = (message: string) => {
    setIsOpen(true);
    setMessage(message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpen(false);

      setTimeout(() => {
        setMessage('');
      }, 400);
    }, 3000);

    toastTimer.current = timer;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ErrorToast message={message} isOpen={isOpen} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
