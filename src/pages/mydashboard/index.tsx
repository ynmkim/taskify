import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parse } from 'cookie';
import { instance } from '@/libs/axios';
import { INVITATION_URL } from '@/constants/apiUrl';
import InvitedCard from '@/components/domains/mydashboard/InvitedCard';
import DashboardList from '@/components/domains/mydashboard/DashboardList';
// import CreateDashboardModal from '@/components/domains/mydashboard/CreateDashboardModal';
import DashboardHeader from '@/components/header/dashboardHeader';
import Layout from '@/components/domains/dashboard/layout';
import { ReactElement } from 'react';
export default function MyDashboardPage({ invitationData }: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <>
      <DashboardHeader dashboardName="내 대시보드" type="myDashboard" dashboardid={0} />
      <main className="grow p-6 md:p-10">
        <DashboardList className="flex flex-col w-full max-w-[1022px] mb-6 sm:mb-10 md:mb-11" />
        <InvitedCard {...invitationData} />
      </main>
    </>
  );
}

MyDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  try {
    const response = await instance.get(INVITATION_URL + '?size=5', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const invitationData = response.data;

    return {
      props: { invitationData },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    }
  }
}
