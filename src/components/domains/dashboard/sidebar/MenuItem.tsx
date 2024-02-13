import { DASHBOARD_COLOR } from "@/constants/constant";
import { Color } from "@/types/DashboardType";
import Link from "next/link";
import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";

const MenuItem = ({children, link, createdByMe, color}: {children:ReactNode, link:number ,createdByMe:boolean, color:Color}) => {

  return(
    <li className="rounded px-3 md:pl-3 md:pr-0 py-3">
      <Link href={`/dashboard/${link}`} className="flex items-center gap-4 justify-center md:justify-normal">
        <div className={`shrink-0 w-2 h-2 rounded-full ${DASHBOARD_COLOR[color]}`} />
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
          <p className="font-Pretendard text-base lg:text-lg font-medium text-gray-787486 leading-none whitespace-nowrap text-ellipsis">
            {children}
          </p>
          {
            createdByMe &&
            <div>
              <FaCrown className="w-[15px] h-3 lg:w-[17.6px] lg:h-[14px]" fill="#FDD446"/>
            </div>
          }
        </div>
      </Link>
    </li>
  )
};

export default MenuItem;
