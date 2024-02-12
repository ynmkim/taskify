import Image from "next/image";
import MenuItem from "./MenuItem";
import { Dashboard } from "@/types/DashboardType";
import AddDashboardDialog from "@/components/dialog/AddDashboardDialog";
import { forwardRef } from "react";
import Link from "next/link";

interface SideBarProps {
  dashboards: Dashboard[];
}

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(({dashboards}, ref) => {
  return(
    <div className="w-[67px] md:w-40 lg:w-[300px] min-h-screen flex flex-col gap-14 pt-5 bg-white border-r border-gray-D9D9D9">
      <Link href='/mydashboard'>
        <div className="relative px-6 hidden md:block">
          <Image src='/logo_large.svg' alt="로고" width={109} height={34}/>
        </div>
        <div className="relative px-6 md:hidden">
          <Image src='/logo_small.svg' alt="로고" width={23.6} height={27.1}/>
        </div>
      </Link>
      <div className="w-[67px] md:w-40 lg:w-[300px] flex flex-col gap-[18px]">
        <div className="flex items-center w-full justify-between px-6">
          <p className="text-xs font-bold text-gray-787486 hidden md:block">Dash Boards</p>
          <div>
            <AddDashboardDialog />
          </div>
        </div>
        <ul className="px-3 flex flex-col gap-[3px] justify-center">
          {dashboards.map((data) => <MenuItem key={data.id} link={data.id} createdByMe={data.createdByMe} color={data.color}>{data.title}</MenuItem>)}
        </ul>
        <div ref={ref}></div>
      </div>
    </div>
  )
});

SideBar.displayName = "SideBar";


export default SideBar;
