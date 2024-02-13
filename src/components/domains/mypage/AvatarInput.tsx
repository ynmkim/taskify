import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { Input } from '@/components/ui/base-input';
import { composeRefs } from '@/libs/composeRefs';
import { LuPlus } from 'react-icons/lu';
interface AvatarInputProps extends React.ComponentPropsWithoutRef<'input'> {
  initialAvatar?: string;
}

const AvatarInput = React.forwardRef<HTMLInputElement, AvatarInputProps>(
  ({ className, initialAvatar, onChange, ...inputProps }, forwardedRef) => {
    const [file, setFile] = useState<File | null>(null);
    const [avatar, setAvatar] = useState<string | undefined>(initialAvatar);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFile(file);
      onChange?.(e);
    };

    const handleUploadClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      inputRef.current?.click();
    };

    useEffect(() => {
      if (!file) {
        setAvatar('');
        return;
      }

      const blobUrl = URL.createObjectURL(file);
      setAvatar(blobUrl);

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }, [file]);

    useEffect(() => {
      setAvatar(initialAvatar);
    }, [initialAvatar]);

    return (
      <div
        className={cn(
          'relative w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-md bg-[#F5F5F5] overflow-hidden',
          className,
        )}
      >
        {avatar && (
          <div className="relative w-full h-full">
            <Image fill src={avatar} alt="이미지 미리보기" className={cn('object-cover', { 'opacity-50': avatar })} />
          </div>
        )}
        <button
          type="button"
          onClick={handleUploadClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-[30px] md:h-[30px] cursor-pointer"
        >
          <LuPlus className="w-5 h-5 md:w-[30px] md:h-[30px] text-violet-5534DA" />
        </button>
        <Input
          ref={composeRefs(inputRef, forwardedRef)}
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleChange}
          className="absolute top-0 left-0 w-[1px] h-[1px] opacity-0"
          {...inputProps}
        />
      </div>
    );
  },
);
AvatarInput.displayName = 'AvatarInput';

export default AvatarInput;
