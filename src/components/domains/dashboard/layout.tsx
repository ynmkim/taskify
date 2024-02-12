import { ReactNode, useEffect, useRef, useState } from "react";
import SideBar from "./sidebar/SideBar";
import { Dashboard } from "@/types/DashboardType";
import { getDashboard } from "@/libs/network";

const Layout = ({ children }: {children:ReactNode}) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const totalCount = useRef(0);
  
  const loadMoreData = () => {
    setPage(prev => prev + 1);
  }

  useEffect(() => {
    const getDashboardData = async() => {
      const dashboardData = await getDashboard(page);
      if(page === 1) setDashboards(dashboardData.dashboards);
      else setDashboards((prev) => [...prev, ...dashboardData.dashboards]);
      totalCount.current = dashboardData.totalCount;
    };
    getDashboardData();
  },[page]);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && dashboards.length < totalCount.current) {
          loadMoreData();
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (observer && observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [totalCount, dashboards.length]);

  const handleChangeDashboard = (dashboard:Dashboard) => {
    setDashboards(prev => [dashboard, ...prev]);
  };

  return(
    <div className="flex">
      <SideBar dashboards={dashboards} ref={observerRef} onChange={handleChangeDashboard}/>
      <main className="flex flex-col max-w-[100vw]">
        {children}
      </main>
    </div>
  )
};

export default Layout;
