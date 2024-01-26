import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";

const MenuItem = ({children, link}: {children:ReactNode, link:number}) => {

  return(
    <li className="rounded pl-3 py-3">
      <Link href={`/dashboard/${link}`} className="flex items-center gap-4 justify-center md:justify-normal">
        <div className="w-2 h-2 rounded-full bg-green-7AC555" />
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
          <p className="font-Pretendard text-base lg:text-lg font-medium text-gray-787486 leading-none">
            {children}
          </p>
          <div>
            <FaCrown fill="#FDD446"/>
          </div>
        </div>
      </Link>
    </li>
  )
};

export default MenuItem;
