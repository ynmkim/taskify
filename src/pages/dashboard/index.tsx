import AddColumnButton from "@/components/domains/dashboard/column/AddColumnButton";
import SideBar from "@/components/domains/dashboard/sidebar/SideBar";
import DashboardHeader from "@/components/header/dashboardHeader";
import Column from "@/containers/Column";

export default function DashboardPage() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex flex-col max-w-[100vw]">
        <DashboardHeader columnName="비브리지" />
        <div className="flex flex-col lg:flex-row w-full">
          <Column />
          <Column />
          <Column />
          <AddColumnButton />
        </div>
      </main>
    </div>
  );
}
