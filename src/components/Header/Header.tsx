import { Link } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.svg';
import * as S from './Header.style';

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <S.HeaderWrapper>
      <Link to="/">
        <img src={MainLogo} alt="메인 로고" />
      </Link>
      {children}
    </S.HeaderWrapper>
  );
};

export default Header;
