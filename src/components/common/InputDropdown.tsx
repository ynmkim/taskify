import Select from 'react-select'; //라이브러리
import React from 'react';
import Label from '@/components/common/Label';

interface InputDropdownProps {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
}

const InputDropdown = ({ label, onChange }: InputDropdownProps) => {
  const members = [
    { value: '', label: '김동빈' },
    { value: '', label: '배유철' },
  ];

  const handlememberChange = (select: string | undefined) => {
    onChange(select);
  };

  return (
    <div>
      <Label text={label} />
      <div className=" h-[42px] md:h-12 md:w-[217px] ">
        <Select
          options={members}
          onChange={(select) => handlememberChange(select)}
          defaultValue={members[0]}
        />
      </div>
    </div>
  );
};

InputDropdown.displayName = 'InputDropdown';
export default InputDropdown;
