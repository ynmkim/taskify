import AddColumnButton from "@/components/domains/dashboard/column/AddColumnButton";
import SideBar from "@/components/domains/dashboard/sidebar/SideBar";
import Column from "@/containers/Column";

export default function DashboardPage() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col lg:flex-row">
        <Column />
        <Column />
        <Column />
        <AddColumnButton />
      </div>
    </div>
  );
}
