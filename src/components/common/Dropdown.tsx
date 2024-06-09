import { useState } from 'react';
import styled from 'styled-components';
import { Option } from '../../types/Option.type';
import UpIcon from '../../assets/UpIcon.svg';
import DownIcon from '../../assets/DownIcon.svg';

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
    <StyledDropdown>
      <SelectWrapper onClick={toggleOptionList}>
        <Select value={selectedOption.name} onChange={handleOptionChange} $isDefault={!selectedOption}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.key} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>

        <ArrowIcon src={isOptionListOpen ? UpIcon : DownIcon} alt={isOptionListOpen ? '옵션 닫기' : '옵션 열기'} />
      </SelectWrapper>
    </StyledDropdown>
  );
};

export default Dropdown;

const StyledDropdown = styled.div`
  position: relative;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Select = styled.select<{ $isDefault: boolean }>`
  width: 125px;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  color: ${(props) =>
    props.$isDefault ? ({ theme }) => theme.color.primary.light : ({ theme }) => theme.color.primary.dark};

  option {
    color: ${({ theme }) => theme.color.primary.dark};
  }
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 10px;
`;
