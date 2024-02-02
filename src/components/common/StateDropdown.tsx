import { forwardRef, useState } from 'react';
import Label from '@/components/common/Label';
import StateList from '@/components/common/StateList';
import Select from 'react-select'; //라이브러리

interface StateProps {
  id: number;
  title: string;
}
interface StateDropdownProps {
  label: string;
}

const StateDropdown = forwardRef<HTMLInputElement, StateDropdownProps>(
  ({ label }) => {
    const [title, setTitle] = useState('To do'); //input에 보이는 값

    const states = [
      { id: 1, title: 'To Do' },
      { id: 2, title: 'On Progress' },
      { id: 3, title: 'Done' },
    ];

    const handleStateClick = (state: StateProps) => {
      setTitle(state.title);
    };

    return (
      <div>
        <Label text={label} />
        <div>
          <div className="h-[42px] md:h-12 md:w-[217px] ">
            <Select
              options={states}
              onChange={handleStateClick}
              defaultValue={title}
            />
          </div>
        </div>
      </div>
    );
  },
);

StateDropdown.displayName = 'StateDropdown';
export default StateDropdown;
