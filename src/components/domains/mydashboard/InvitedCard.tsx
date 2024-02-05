import DashboaordCardTitle from '@/components/common/CardTitle';
import InvitedTable from '@/components/domains/mydashboard/InvitedTable';
import { SearchInput } from './SearchInput';
import Image from 'next/image';
import { totalCount } from '@/pages/api/mock/invitations.json';

function EmptyView() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 pt-[85px] pb-[154px] md:pt-[46px] md:pb-[128px]">
      <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
        <Image src="/empty_view.svg" alt="" layout="fill" objectFit="cover" />
      </div>
      <p className="text-sm md:text-lg text-gray-9FA6B2 ">아직 초대받은 대시보드가 없어요</p>
    </div>
  );
}

export default function InvitedCard() {
  return (
    <div className="max-w-[1022px] pt-6 pb-5 px-4 md:pt-8 md:pb-0 md:px-7 rounded-lg bg-white">
      <DashboaordCardTitle className="mb-6">초대받은 대시보드</DashboaordCardTitle>
      {totalCount === 0 ? (
        <EmptyView />
      ) : (
        <>
          <SearchInput placeholder="검색" className="mb-5" />
          <InvitedTable />
        </>
      )}
    </div>
  );
}
