import { Dashboard } from "@/types/DashboardType";
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { getDashboard } from "@/libs/network";

type DashboardContextType = {
  dashboards: Dashboard[];
  setDashboards: Dispatch<SetStateAction<Dashboard[]>>;
};

export const DashboardContext = createContext<DashboardContextType>({
  dashboards: [],
  setDashboards: () => {},
});

const DashboardProvider = ({children}:{children:ReactNode}) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  return(
    <DashboardContext.Provider value={{dashboards, setDashboards}}>
      {children}
    </DashboardContext.Provider>
  )
};

export default DashboardProvider
