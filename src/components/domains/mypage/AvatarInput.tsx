import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { Input } from '@/components/ui/base-input';

interface AvatarInputProps {
  className?: string;
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

function AvatarInput({ className, name, value, onChange, ...props }: AvatarInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0] || null;
    onChange?.(name, nextValue);
  };

  useEffect(() => {
    if (value) {
      const nextPreview = URL.createObjectURL(value);
      setPreview(nextPreview);

      return () => {
        setPreview('');
        URL.revokeObjectURL(nextPreview);
      };
    }
  }, [value]);

  const handleUploadClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        'relative w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5] overflow-hidden',
        className,
      )}
      {...props}
    >
      {value && (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="이미지 미리보기"
            className={cn('block w-full h-full object-center object-cover', { 'opacity-50': preview })}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <button
        type="button"
        onClick={handleUploadClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-[30px] md:h-[30px] cursor-pointer"
      >
        <Image src="/plus_upload.svg" alt="이미지 업로드" className="w-full h-full" layout="fill" objectFit="cover" />
      </button>
      <Input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
        className="absolute top-0 left-0 w-[1px] h-[1px] opacity-0"
      />
    </div>
  );
}

export default AvatarInput;
