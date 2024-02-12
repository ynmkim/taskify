import Select from 'react-select';
import React, { useState } from 'react';
import Label from '@/components/common/Label';

import { Column } from '@/types/DashboardType';

interface StateDropdownProps {
  label: string;
  onChange: (value: number) => void;
  columns: Column[];
  column: Column;
}
type SingleValue<T> = T | null | undefined;

const StateDropdown = ({ label, onChange, columns, column }: StateDropdownProps) => {
  const [title, setTitle] = useState(column.title); //input에 보이는 값

  const members = columns?.map((state) => {
    return {
      value: state.id,
      label: state.title,
    };
  });

  const handleStateChange = (newValue: SingleValue<{ value: number; label: string }>) => {
    const selectedColumn = columns.find((column) => column.id === newValue?.value);
    if (selectedColumn) {
      onChange(selectedColumn.id);
      setTitle(selectedColumn.title);
    }
  };
  return (
    <div>
      <Label text={label} />
      <div className=" h-[42px] w-full md:h-12 md:w-[217px] ">
        <Select
          className="text-[14px] md:text-[16px]"
          inputId="contact"
          options={members}
          onChange={(newValue) => handleStateChange(newValue)}
          placeholder={title}
          components={{
            // 구분선 숨김
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};

StateDropdown.displayName = 'InputDropdown';
export default StateDropdown;
