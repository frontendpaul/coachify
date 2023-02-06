import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import Head from 'next/head';
import { Provider } from 'jotai';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [products, setProducts] = useState<any[]>();

  const getProducts = async () => {
    try {
      let { data: product, error } = await supabaseClient.from('product')
        .select(`
        id,
        owner:user(
          full_name,
          avatar_url,
          description
        ),
        state,
        free,
        price,
        old_price,
        category(name),
        sections:section(
          *,
          chapters:chapter(
            *,
            video:video(*),
            resources:resource(*)
          )
        ),
        reviews:review(
          id,
          owner:user(
            full_name,
            avatar_url
          ),
          body,
          rating,
          created_at,
          updated_at
        ),
        created_at,
        updated_at
        `);

      product && setProducts(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Provider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/coachify-logo.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionContextProvider>
  );
}
