import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Provider } from 'jotai';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Provider>
      <Head>
        <title>Coachify</title>
        <meta name="description" content="Coachify app" />
      </Head>
      <div className="text-red-500 text-5xl font-bold">Index</div>
    </Provider>
  );
}
