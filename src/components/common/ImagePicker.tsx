import React, { useState, ChangeEvent, MouseEvent, RefObject, useRef, useImperativeHandle } from 'react';
import Image from 'next/legacy/image';
import { FiPlus } from 'react-icons/fi';

import Label from '@/components/common/Label';
import { axiosAuthInstance } from '@/libs/axiosAuthInstance';

interface ImagePickerProps {
  label?: string;
  required?: boolean;
  onSelectImage: (imageUrl: string) => void;
  columnId: number;
  selectedImageUrl?: string;
}

const ImagePicker = React.forwardRef(function ImagePicker(
  { label, required, onSelectImage, columnId }: ImagePickerProps,
  ref,
) {
  const [imgUrl, setImgUrl] = useState<string>('');
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      inputRef.current?.click();
    },
  }));

  const handleButtonClick = (e: MouseEvent) => {
    inputRef.current?.click();
  };

  const handleImageChange = (columnId: number) => async (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current?.files && inputRef.current.files[0]) {
      const imageFile = inputRef.current.files[0];

      try {
        const res = await axiosAuthInstance().post(
          `columns/${columnId}/card-image`,
          {
            image: imageFile,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (res.status === 201) {
          const imageURL = res.data.imageUrl;
          setImgUrl(imageURL);
          onSelectImage(imageURL);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Label text={label} required={required} />
      <button
        type="button"
        className="border border-solid rounded-md bg-gray-F5F5F5 relative overflow-hidden w-[58px] h-[58px] md:h-[76px] md:w-[76px]"
        onClick={handleButtonClick}
      >
        <div className="w-full h-full">
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange(columnId)}
            accept="image/*"
            className="hidden"
          />
          {imgUrl ? (
            <div className="w-full h-full rounded-md overflow-hidden relative">
              <Image src={imgUrl} alt="프로필 이미지" layout="fill" objectFit="cover" />
            </div>
          ) : (
            <>
              <FiPlus className="text-violet-5534DA m-[18px] md:m-6 w-[21px] h-[21px] md:w-7 md:h-7 flex-shrink-0" />
            </>
          )}
        </div>
      </button>
    </div>
  );
});

export default ImagePicker;

// const send = () => {};

// const imgReset = () => {
//   if (imgRef.current) {
//     imgRef.current.value = '';
//     URL.revokeObjectURL(imgUrl);
//     setImgUrl('');
//   }
// };
{
  /* <button
              type="button"
              className="p-[24px] "
              onClick={imgReset}
            >
              삭제하기
            </button> */
}
