import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import Label from '@/components/common/Label';

import { Member } from '@/types/DashboardType';
import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';
import { Column } from '@/types/DashboardType';

interface StateDropdownProps {
  label: string;
  stateTitle: string;
  onChange: (value: Member | null) => void;
  states: Column[];
}

const StateDropdown = ({ label, stateTitle, onChange, states }: StateDropdownProps) => {
  const [title, setTitle] = useState(stateTitle); //input에 보이는 값

  const members = states?.map((state) => {
    return {
      value: state.id,
      label: state.title,
    };
  });

  const handleStateChange = (state: Column) => {
    onChange(state.id);
    setTitle(state.title);
  };

  return (
    <div>
      <Label text={label} />
      <div className=" h-[42px] w-full md:h-12 md:w-[217px] ">
        <Select
          className="text-[14px] md:text-[16px]"
          inputId="contact"
          options={members}
          onChange={(state) => handleStateChange(state as Column)}
          placeholder="이름을 입력해 주세요"
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
