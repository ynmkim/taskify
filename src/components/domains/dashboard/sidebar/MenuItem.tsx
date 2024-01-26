import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";

const MenuItem = ({children, link}: {children:ReactNode, link:number}) => {

  return(
    <li className="rounded px-3">
      <Link href={`/dashboard/${link}`} className="py-3 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-green-7AC555" />
        <div className="hidden md:flex items-center gap-[6px]">
          <p className="font-Pretendard text-lg font-medium text-gray-787486">
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
