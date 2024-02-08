import AddColumnDialog from "@/components/dialog/AddColumnDialog";
import Layout from "@/components/domains/dashboard/layout";
import DashboardHeader from "@/components/header/dashboardHeader";
import Column from "@/containers/Column";
import { useDashboard } from "@/contexts/useDashboard";
import { ReactElement, useEffect } from "react";

export default function DashboardPage() {

  return (
    <>
        <DashboardHeader columnName="비브리지" />
        <div className="flex flex-col lg:flex-row w-full bg-gray-FAFAFA overflow-scroll">
          <Column />
          <Column />
          <Column />
          <div>
            <AddColumnDialog />
          </div>
        </div>
    </>

  );
}

DashboardPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
