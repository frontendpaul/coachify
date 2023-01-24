import Head from 'next/head';
import TopRanked from '../components/TopRanked';
import Statistics from '../components/Statistics';
import RecentlyAdded from '@components/RecentlyAdded';
import Categories from '@components/Categories';
import Promo from '@components/Promo';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coachify</title>
        <meta name="description" content="Coachify app" />
      </Head>
      <div className="grid gap-16 md:gap-32">
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
