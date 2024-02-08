import { ReactNode, useEffect, useState } from "react";
import SideBar from "./sidebar/SideBar";
import { useDashboard } from "@/contexts/useDashboard";
import { Dashboard } from "@/types/DashboardType";
import { getDashboard } from "@/libs/network";

const Layout = ({ children }: {children:ReactNode}) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  
  useEffect(() => {
    const getDashboardData = async() => {
      const dashboardData = await getDashboard();
      setDashboards(dashboardData);
    };

    getDashboardData();
  },[]);

  return(
    <div className="flex">
      <SideBar dashboards={dashboards}/>
      <main className="flex flex-col max-w-[100vw]">
        {children}
      </main>
    </div>
  )
};

export default Layout;
