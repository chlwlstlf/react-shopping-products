import UpIcon from '../../assets/UpIconWhite.svg';
import * as S from './FloatingButton.style';

const FloatingButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.Layout type="button" onClick={goToTop}>
      <img src={UpIcon} alt="위로 스크롤" />
    </S.Layout>
  );
};

export default FloatingButton;
