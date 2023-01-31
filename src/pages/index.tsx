import Head from 'next/head';
import TopRanked from '../components/pages/home/TopRanked';
import Statistics from '../components/pages/home/Statistics';
import RecentlyAdded from '@components/pages/home/RecentlyAdded';
import Categories from '@components/pages/home/Categories';
import Promo from '@components/pages/home/Promo';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coachify</title>
        <meta name="description" content="Coachify app" />
      </Head>
      <div className="grid gap-16 md:gap-32 py-6">
        <h1 className="sr-only">
          Discover hundreds of courses from world-class teachers - welcome to
          the Coachify Marketplace!
        </h1>
        <TopRanked />
        <Statistics />
        <RecentlyAdded />
        <Categories />
        <Promo />
      </div>
    </>
  );
}
