import Image from 'next/image';
import { SettingBoxProps } from '../../../type';

export default function SettingBox({ src, width, height, title, description }: SettingBoxProps) {
  return (
    <div className="w-full md:w-[375px] lg:max-w-[32%] mx-auto">
      <div className="bg-black-4B4B4B px-9 h-[260px] rounded-t-lg flex justify-center items-center">
        <Image className="rounded-lg" src={src} width={width} height={height} alt="feature" />
      </div>
      <div className="bg-black-171717 p-8 py-7 md:py-8 text-white rounded-b-lg">
        <div className="text-lg font-bold mb-[18px]">{title}</div>
        <div className="text-base font-medium whitespace-nowrap">{description}</div>
      </div>
    </div>
  );
}
