import * as S from './ErrorToast.style';

interface ErrorToastProps {
  message: string;
  isOpen: boolean;
}

const ErrorToast = ({ message, isOpen }: ErrorToastProps) => {
  return <S.Layout $isOpen={isOpen}>{message}</S.Layout>;
};

export default ErrorToast;
