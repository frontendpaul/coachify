import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import Head from 'next/head';
import { Provider as JotaiProvider } from 'jotai';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { SWRConfig } from 'swr';
import * as Toast from '@radix-ui/react-toast';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <JotaiProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/coachify-logo.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <Toast.Provider duration={2000}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toast.Viewport className="fixed bottom-0 right-0 z-50 grid max-w-[100vw] gap-2 p-6" />
          </Toast.Provider>
        </JotaiProvider>
      </SessionContextProvider>
    </SWRConfig>
  );
}
