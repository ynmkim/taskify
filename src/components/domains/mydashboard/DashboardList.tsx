import { dashboards } from '@/pages/api/mock/dashboards.json';
import Link from 'next/link';
import { cn } from '@/libs/utils';
import Image from 'next/image';

interface BulletProps {
  color: string;
}

interface DashboardListProps {
  className?: string;
}

function Bullet({ color }: BulletProps) {
  return <span className={cn(`block rounded-full w-[8px] h-[8px] mr-4 bg-[${color}]`)}></span>;
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

export default function DashboardList({ className, ...props }: DashboardListProps) {
  return (
    <div className={cn(className)} {...props}>
      <ul className="grid grid-rows-1 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 md:grid-cols-3 md:gap-[13px] ">
        <li>
          <DashboardAddButton />
        </li>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/1`}
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
    </div>
  );
}
