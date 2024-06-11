import { useState } from 'react';
import UpIcon from '../../assets/UpIcon.svg';
import DownIcon from '../../assets/DownIcon.svg';
import * as S from '../Dropdown/Dropdown.style';
import { Option } from '../../types/Option.type';

interface DropdownProps {
  options: Option[];
  selectedOption: Option;
  placeholder?: string;
  updateOption: (option: Option) => void;
}

const Dropdown = ({ options, selectedOption, placeholder, updateOption }: DropdownProps) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const newOption = options.find((option) => option.name === selectedValue);

    if (newOption) {
      updateOption(newOption);
    }
  };

  const toggleOptionList = () => setIsOptionListOpen((prev) => !prev);

  return (
    <S.SelectContainer>
      <S.SelectWrapper onClick={toggleOptionList}>
        <S.Select value={selectedOption.name} onChange={handleOptionChange} $isDefault={!selectedOption}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.key} value={option.name}>
              {option.name}
            </option>
          ))}
        </S.Select>

        <S.ArrowIcon src={isOptionListOpen ? UpIcon : DownIcon} alt={isOptionListOpen ? '옵션 닫기' : '옵션 열기'} />
      </S.SelectWrapper>
    </S.SelectContainer>
  );
};

export default Dropdown;
