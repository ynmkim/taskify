import { ReactNode, useEffect } from "react";
import SideBar from "./sidebar/SideBar";
import { useDashboard } from "@/contexts/useDashboard";

const Layout = ({ children }: {children:ReactNode}) => {
  const { dashboards, updateDashboards, isLoading } = useDashboard();
  
  useEffect(() => {
    const getDashboardData = async() => {
      updateDashboards();
    }
    getDashboardData();
  },[]);

  useEffect(() => {
    console.log(dashboards);
  }, [dashboards])
  
  if (isLoading) {
    return <div>Loading...</div>;  // 로딩 UI
  }

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
