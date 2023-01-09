import Head from 'next/head';
import TopRanked from '../components/TopRanked';
import Statistics from '../components/Statistics';
import RecentlyAdded from '@components/RecentlyAdded';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coachify</title>
        <meta name="description" content="Coachify app" />
      </Head>
      <TopRanked />
      <Statistics />
      <RecentlyAdded />
    </>
  );
}
