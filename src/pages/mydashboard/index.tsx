import InvitedCard from '@/components/domains/mydashboard/InvitedCard';
import DashboardList from '@/components/domains/mydashboard/DashboardList';
import Pagination from '@/components/domains/mydashboard/Pagination';
// import AddDashboardModal from '@/components/domains/mydashboard/AddDashboardModal';
import DashboardHeader from '@/components/header/dashboardHeader';
import Layout from '@/components/domains/dashboard/layout';
import { ReactElement } from 'react';

export default function MyDashboardPage() {

  return (
    <>
        <DashboardHeader dashboardName="내 대시보드" type="myDashboard" />
        <main className="grow p-6 md:p-10">
          <div className="flex flex-col items-end max-w-[1022px] mb-6 sm:mb-10 md:mb-11 ">
            <DashboardList className="w-full max-w-[1022px] mb-2 sm:mb-2" />
            <Pagination />
          </div>
          <InvitedCard />
          {/* <AddDashboardModal /> */}
        </main>
    </>

  );
}

MyDashboardPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
