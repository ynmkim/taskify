import SideBar from "@/components/domains/dashboard/sidebar/SideBar";
import { getDashboard } from "@/libs/network";
import { Dashboard } from "@/types/DashboardType";

export async function getServerSideProps() {
  const data = await getDashboard();

  return {
    props: {data}
  }
}

export default function DashboardIdPage({ data }:{ data:Dashboard[]}) {
  return (
    <SideBar dashboards={data}/>
  );
}
