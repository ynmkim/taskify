import * as React from 'react';
// import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';

import { DateTime } from 'ts-luxon';
import Label from '@/components/common/Label';
import { ko } from 'date-fns/locale';

interface SelectDateProps {
  label?: string;
  value?: string | null;
  onChange: (date: string | null) => void;
}

export function DateTimePicker({ label, value, onChange }: SelectDateProps) {
  // const [startDate, setStartDate] = React.useState<Date>();

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newDate = new Date(e.target.value);
  //   setStartDate(newDate);
  // };
  const handleDateChange = (dd: Date | null) => {
    if (dd && onChange) {
      const formattedDate = DateTime.fromJSDate(dd).toFormat('yyyy-MM-dd HH:mm');
      onChange(formattedDate);
    }
  };
  return (
    <div>
      <Label text={label} />
      <div className="flex border border-gray-D9D9D9 items-center px-4 gap-[10px] w-full h-[42px] md:h-12 rounded-md ">
        <CiCalendar />
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={handleDateChange}
          timeInputLabel="Time:"
          dateFormat="yyyy년 MM월 dd일 HH시 mm분"
          showTimeInput
          placeholderText="날짜를 선택해주세요."
          className="outline-0 cursor-pointer w-[240px] caret-transparent text-[14px] md:text-[] flex"
          locale={ko}
        />
      </div>
    </div>
  );
}

// //   <Calendar
// mode="single"
// selected={date}
// onSelect={setDate}
// initialFocus
// classNames={{
//   nav_button: '',
//   day: 'day',
//   day_selected: 'selected',
//   day_outside: '',
// }}
// />
