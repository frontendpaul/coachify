import Head from 'next/head';
import { Inter } from '@next/font/google';
import TopRanked from '../components/TopRanked';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Coachify</title>
        <meta name="description" content="Coachify app" />
      </Head>
      <TopRanked />
    </>
  );
}
