import Image from 'next/image';

export default function EmptyView() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 pt-[85px] pb-[154px] md:pt-[46px] md:pb-[128px]">
      <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
        <Image src="/empty_view.svg" alt="" layout="fill" objectFit="cover" />
      </div>
      <p className="text-sm md:text-lg text-gray-9FA6B2 ">아직 초대받은 대시보드가 없어요</p>
    </div>
  );
}
