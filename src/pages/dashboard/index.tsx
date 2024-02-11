import AddColumnButton from "@/components/domains/dashboard/column/AddColumnButton";
import SideBar from "@/components/domains/dashboard/sidebar/SideBar";
import DashboardHeader from "@/components/header/dashboardHeader";
import Column from "@/containers/Column";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { dashboardid } = router.query;
  return (
    <div className="flex">
      <SideBar />
      <main className="flex flex-col max-w-[100vw]">
        <DashboardHeader type="" dashboardid={dashboardid} />
        <div className="flex flex-col lg:flex-row w-full bg-gray-FAFAFA overflow-scroll">
          <Column />
          <Column />
          <Column />
          <AddColumnButton dashboardid={dashboardid} />
        </div>
      </main>
    </div>
  );
}
