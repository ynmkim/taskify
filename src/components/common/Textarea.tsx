import { forwardRef } from 'react';
import Label from '@/components/common/Label';

interface TextareaProps {
  label?: string;
  required?: boolean;
  value: string;
  onChange: () => void;
  requiredValue?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, required, requiredValue, value, onChange },
  ref,
) {
  return (
    <div>
      <Label text={label} required={required} />
      <div className="mt-2.5">
        <textarea
          ref={ref}
          className={`${requiredValue ? 'border-red-D6173A' : 'border-gray-D9D9D9'} selection:block w-full rounded-md border border-solid px-[16px] py-[14px] text-[14px] h-[84px] text-gray70 placeholder:text-gray-9FA6B2 focus:border-violet outline-0  md:text-[16px] md:h-24`}
          maxLength={200}
          placeholder="200자 이내로 작성해주세요."
          value={value}
          onChange={onChange}
        />
      </div>
      {requiredValue && <p className="text-[14px] text-red-D6173A mt-[8px]">{requiredValue}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
