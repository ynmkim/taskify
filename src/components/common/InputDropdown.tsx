import Select from 'react-select';
import React, { useEffect } from 'react';
import Label from '@/components/common/Label';

import { Member } from '@/types/DashboardType';
import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';

interface InputDropdownProps {
  label: string;
  onChange: (value: Member | null) => void;
  dashboardId: number;
}

const InputDropdown = ({ label, onChange, dashboardId }: InputDropdownProps) => {
  const getMembers = () => axiosAuthInstance().get(`members?dashboardId=${dashboardId}`);
  const { execute: getMemberAsync, data } = useAsync(getMembers, false);

  useEffect(() => {
    getMemberAsync();
  }, [dashboardId]);

  const members = data?.members?.map((member: Member) => {
    return {
      value: member.userId,
      label: member.nickname,
    };
  });

  const handleMemberChange = (select: Member) => {
    onChange(select);
  };

  return (
    <div>
      <Label text={label} />
      <div className=" h-[42px] w-full md:h-12 md:w-[217px] ">
        <Select
          className="text-[14px] md:text-[16px]"
          inputId="contact"
          options={members}
          onChange={(select) => handleMemberChange(select as Member)}
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

InputDropdown.displayName = 'InputDropdown';
export default InputDropdown;
