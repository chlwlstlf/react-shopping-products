import React, { ButtonHTMLAttributes } from 'react';
import * as S from './Button.style';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({ children, variant = 'primary', ...rest }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <S.Layout type="button" $isActive={!rest.disabled} $variant={variant} {...rest}>
      {children}
    </S.Layout>
  );
};

export default Button;
