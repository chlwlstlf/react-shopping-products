import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({ children, variant = 'primary', size = 'large', ...rest }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size} $isActive={!rest.disabled} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary';
  $size: 'small' | 'medium' | 'large';
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  outline: none;
  cursor: pointer;

  ${(props) => variantStyles[props.$variant]}
  ${(props) => sizeStyles[props.$size]}
`;

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.color.primary.main};
    color: ${({ theme }) => theme.color.primary.white};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.color.primary.white};
    color: ${({ theme }) => theme.color.primary.semiLight};
  `,
};

const sizeStyles = {
  small: css`
    width: 24px;
    height: 24px;
    padding: 0;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  `,
  medium: css`
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  `,
  large: css`
    width: 100%;
    padding: 16px 0;
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,
};
