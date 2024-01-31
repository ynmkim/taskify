import Select from 'react-select'; //라이브러리
import React from 'react';
import Label from '@/components/common/Label';

interface InputDropdownProps {
  label: string;
  required: boolean;
  value?: string;
  onChange: (value: Object | number | null) => void;
}

const InputDropdown = ({ label, required, onChange }: InputDropdownProps) => {
  const members = [
    { value: '', label: '김동빈' },
    { value: '', label: '배유철' },
  ];

  const handlememberChange = (select: Object | null) => {
    onChange(select);
  };

  return (
    <div>
      <Label text={label} required={required} />
      <div className="h-[42px] md:h-12 md:w-[217px] ">
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
