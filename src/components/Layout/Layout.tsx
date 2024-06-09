import { ReactNode } from 'react';
import * as S from './Layout.style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <S.Layout>{children}</S.Layout>;
};

Layout.Header = ({ children }: { children?: ReactNode }) => {
  return <S.Header>{children}</S.Header>;
};

Layout.Content = ({ children }: { children?: ReactNode }) => {
  return <S.Content>{children}</S.Content>;
};

Layout.Title = ({ mainTitle, subTitle }: { mainTitle: string; subTitle?: string }) => {
  return (
    <S.Title>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
    </S.Title>
  );
};

export default Layout;
