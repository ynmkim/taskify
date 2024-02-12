import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { axiosAuthInstance } from '@/libs/axios';
import useStore from '@/state/dashboardTitleState';

interface DashboardNameProps {
  className?: string;
  dashboardid: string | string[] | number | undefined;
}
const authInstance = axiosAuthInstance();

const DashboardName: React.FC<DashboardNameProps> = ({ dashboardid }) => {
  type State = {
    dashboardTitle: string;
    setDashboardTitle: (title: string) => void;
  };
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7AC555');
  const setDashboardTitle = useStore((state: State) => state.setDashboardTitle);
  const dashboardTitle = useStore((state: State) => state.dashboardTitle);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleUpdate = async () => {
    try {
      const response = await authInstance.put(`dashboards/${dashboardid}`, {
        title: inputValue,
        color: selectedColor
      });
      if (response.status === 200) {
        setDashboardTitle(inputValue);
        alert('Dashboard updated successfully!');
      } else {
        alert('Error updating dashboard');
      }
    } catch (error) {
      alert('Error updating dashboard: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dashboardid) {
          const response = await authInstance.get(`dashboards/${dashboardid}`);
          const data = await response.data;
          if (data && data.title) {
            setDashboardTitle(data.title);
          } else {
            alert('Data or Title not found in response');
          }
        }   
      } catch (error) {
          alert('Error fetching dashboard: ' + (error as Error).message);
        }
    };
  
    fetchData();
  }, [dashboardid]);

  return (
    <div className={'bg-white pt-[24px] lg:pt-[32px] md:pt-[32px] px-[20px] lg:px-[28px] md:px-[20px] pb-[19px] lg:pb-[28px] md:pb-[28px] rounded-md shadow-md w-[100%] h-[256px] mb-[12px] text-[11px] lg:text-[14px] md:text-[14px]'}>
      <div className='h-[24px] flex flex-row justify-between'>
        <h2 className="w-[71px] text-xl font-bold mb-[37px]">{dashboardTitle}</h2>
        <RadioGroup className='flex flex-row h-[25px]'>
          <RadioGroupItem color='green' value='#7AC555' onClick={() => handleColorChange('#7AC555')} />
          <RadioGroupItem color='purple' value='#760DDE' onClick={() => handleColorChange('#760DDE')} />
          <RadioGroupItem color='orange' value='#FFA500' onClick={() => handleColorChange('#FFA500')} />
          <RadioGroupItem color='blue' value='#76A5EA' onClick={() => handleColorChange('#76A5EA')} />
          <RadioGroupItem color='pink' value='#E876EA' onClick={() => handleColorChange('#E876EA')} />
        </RadioGroup>
      </div>
      <div>
        <label className="text-lg font-medium block mb-[10px] mt-[32px]">대시보드 이름</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-3 placeholder:text-gray-500 focus:outline-violet-500 z-0 relative"
          value={inputValue}
          placeholder={dashboardTitle}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='my-[28px] flex justify-end'>
        <Button variant="violet" text="login" className='w-[84px] h-[32px] px-[29px] py-[7px] text-sm font-medium' onClick={handleUpdate}>변경</Button>
      </div>
    </div>
  );
};

export default DashboardName;
