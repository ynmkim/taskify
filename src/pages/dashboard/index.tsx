import AddColumnDialog from "@/components/dialog/AddColumnDialog";
import SideBar from "@/components/domains/dashboard/sidebar/SideBar";
import DashboardHeader from "@/components/header/dashboardHeader";
import Column from "@/containers/Column";
import { getDashboard } from "@/libs/network";
import { Dashboard } from "@/types/DashboardType";

export async function getServerSideProps() {
  const data = await getDashboard();

  return {
    props: {data}
  }
}

export default function DashboardPage({ data }:{ data:Dashboard[]}) {

  return (
    <div className="flex">
      <SideBar dashboards={data}/>
      <main className="flex flex-col max-w-[100vw]">
        <DashboardHeader columnName="비브리지" />
        <div className="flex flex-col lg:flex-row w-full bg-gray-FAFAFA overflow-scroll">
          <Column />
          <Column />
          <Column />
          <div>
            <AddColumnDialog />
          </div>
        </div>
      </main>
    </div>
  );
}
