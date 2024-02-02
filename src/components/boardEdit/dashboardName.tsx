import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface DashboardNameProps {
  title: string;
  className?: string;
}

const DashboardName: React.FC<DashboardNameProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={'bg-white pt-[24px] lg:pt-[32px] md:pt-[32px] px-[20px] lg:px-[28px] md:px-[20px] pb-[19px] lg:pb-[28px] md:pb-[28px] rounded-md shadow-md w-[100%] h-[256px] mb-[12px] text-[11px] lg:text-[14px] md:text-[14px]'}>
      <div className='h-[24px] flex flex-row justify-between'>
        <h2 className="w-[71px] text-xl font-bold mb-[37px]">{title}</h2>
        <RadioGroup className='flex flex-row h-[25px]'>
        <RadioGroupItem color='green' value='green-option'/>
          <RadioGroupItem color='purple' value='purple-option' />
          <RadioGroupItem color='orange' value='orange-option' />
          <RadioGroupItem color='blue' value='blue-option' />
          <RadioGroupItem color='pink' value='pink-option' />
        </RadioGroup>
      </div>
      <div>
        <label className="text-lg font-medium block mb-[10px] mt-[32px]">대시보드 이름</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-3 placeholder:text-gray-500 focus:outline-violet-500 z-0 relative"
          value={inputValue}
          placeholder={title}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='my-[28px] flex justify-end'>
        <Button variant="violet" text="login" className='w-[84px] h-[32px] px-[29px] py-[7px] text-sm font-medium'>변경</Button>
      </div>
    </div>
  );
};

export default DashboardName;
