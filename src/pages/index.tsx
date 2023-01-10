import Head from 'next/head';
import TopRanked from '../components/TopRanked';
import Statistics from '../components/Statistics';
import RecentlyAdded from '@components/RecentlyAdded';
import Categories from '@components/Categories';

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
      <div className="mt-16 md:mt-32"></div>
      <Categories />
    </>
  );
}
