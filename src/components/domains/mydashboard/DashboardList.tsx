import Link from 'next/link';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { getDashboards } from '@/api/fetchDashboard';
import { useState, useEffect } from 'react';
import { DASHBOARD_COLOR } from '@/constants/constants';
import Pagination from '@/components/domains/mydashboard/Pagination';
interface DashboardListProps {
  className?: string;
}
interface Dashboard {
  id: number;
  title: string;
  createdByMe: boolean;
  color: string;
}

export default function DashboardList({ className, ...props }: DashboardListProps) {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    const handleload = async () => {
      const { dashboards, totalCount } = await getDashboards('pagination', pageSize, currentPage);
      setDashboards(dashboards);

      const calculatedTotalPage = Math.ceil(totalCount / pageSize);
      setTotalPage(calculatedTotalPage);
    };

    handleload();
  }, [currentPage]);

  return (
    <div className={cn(className)} {...props}>
      <ul className="grid grid-rows-1 grid-cols-1 gap-2 md:grid-cols-2 md:gap-2.5 lg:grid-cols-3 lg:gap-[13px] ">
        <li>
          <DashboardAddButton />
        </li>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className="flex justify-between h-[58px] sm:h-[68px] md:h-[70px] px-5 rounded-lg border border-gray-D9D9D9 bg-white text-base font-semibold text-black-333236"
            >
              <div className="flex items-center whitespace-nowrap">
                <Bullet color={dashboard.color} />
                {dashboard.title}
                {dashboard.createdByMe && (
                  <div className="relative w-4 h-3 md:w-[21px] md:h-[17px] ml-2">
                    <Image fill src="/crown.svg" alt="" className="object-cover" />
                  </div>
                )}
              </div>

              <Image src="/arrow_link.svg" alt="" width={18} height={18} />
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        className="self-end mt-2 sm:mt-2"
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
interface BulletProps {
  color: string;
}

function Bullet({ color }: BulletProps) {
  const bulletColor = DASHBOARD_COLOR[color];

  return <span className={cn(`block rounded-full w-[8px] h-[8px] mr-4 ${bulletColor}`)}></span>;
}

function DashboardAddButton() {
  return (
    <button className="flex justify-center items-center gap-2.5 w-full h-[58px] sm:h-[68px] md:h-[70px] px-5 rounded-lg border border-gray-D9D9D9 bg-white text-base font-semibold text-black-333236">
      새로운 대시보드
      <div className="relative w-5 h-5 md:w-[22px] md:h-[22px]">
        <Image fill src="/plus_add.svg" alt="" className="object-cover" />
      </div>
    </button>
  );
}
