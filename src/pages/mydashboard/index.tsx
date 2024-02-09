import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parse } from 'cookie';
import { instance } from '@/libs/axios';
import { INVITATION_URL } from '@/constants/apiUrl';
import InvitedCard from '@/components/domains/mydashboard/InvitedCard';
import DashboardList from '@/components/domains/mydashboard/DashboardList';
import Pagination from '@/components/domains/mydashboard/Pagination';
import DashboardHeader from '@/components/header/dashboardHeader';
import Layout from '@/components/domains/dashboard/layout';
import { ReactElement } from 'react';

export default function MyDashboardPage({ invitationData }: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <>
        <DashboardHeader dashboardName="내 대시보드" type="myDashboard" />
        <main className="grow p-6 md:p-10">
          <div className="flex flex-col items-end max-w-[1022px] mb-6 sm:mb-10 md:mb-11 ">
            <DashboardList className="w-full max-w-[1022px] mb-2 sm:mb-2" />
            <Pagination />
          </div>
          <InvitedCard {...invitationData} />
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
      console.log(error);
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    }
  }
}
