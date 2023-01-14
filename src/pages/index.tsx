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
      <div className="grid gap-16 md:gap-32">
        <TopRanked />
        <Statistics />
        <RecentlyAdded />
        <Categories />
      </div>
    </>
  );
}
