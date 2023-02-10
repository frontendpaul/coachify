import { Open_Sans } from '@next/font/google';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Contract } from 'types/supabase';
import useWindowWidth from '../../hooks/useWindowWidth';
import Footer from './Footer';
import Header, { isSidenavExpandedAtom } from './Header';
import OverlaySidenav from './OverlaySidenav';
import Sidenav from './Sidenav';

const openSans = Open_Sans({ subsets: ['latin'] });

type Props = {
  children?: React.ReactNode;
};

export const isMobileAtom = atom<boolean>(true);
export const isMediumScreenAtom = atom<boolean>(true);
export const isLearnPageAtom = atom<boolean>(false);
export const userContractsAtom = atom<Contract[] | null>(null);

const Layout = ({ children }: Props): React.ReactElement => {
  const [isSidenavExpanded, setIsSidenavExpanded] = useAtom(
    isSidenavExpandedAtom
  );
  const [, setIsMobile] = useAtom(isMobileAtom);
  const [, setIsMediumScreen] = useAtom(isMediumScreenAtom);

  const windowWidth = useWindowWidth();
  const router = useRouter();

  const [isLearnPage, setIsLearnPage] = useAtom(isLearnPageAtom);
  useEffect(() => {
    const isMediumScreen = windowWidth < 1024;
    const isMobile = windowWidth < 768;
    setIsMobile(isMobile);
    setIsMediumScreen(isMediumScreen);
    !isLearnPage && setIsSidenavExpanded(!isMediumScreen);
  }, [
    windowWidth,
    setIsMobile,
    setIsMediumScreen,
    setIsSidenavExpanded,
    isLearnPage,
  ]);

  useEffect(() => {
    const isLearnPage = router.pathname.includes('/course/[id]/learn');
    setIsLearnPage(isLearnPage);
    // isLearnPage && setIsSidenavExpanded(false);
  });

  const supabase = useSupabaseClient();
  const user = useUser();
  const [_, setUserContracts] = useAtom(userContractsAtom);

  const getUserContracts = async (userId: string) => {
    try {
      let { data: contracts, error } = await supabase
        .from('contract')
        .select(
          `
        id,
        buyer_id,
        seller_id,
        product_id,
        created_at,
        updated_at
        `
        )
        .eq('buyer_id', userId);

      if (error) throw error;

      contracts && setUserContracts(contracts);
      console.log(contracts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserContracts(user.id);
    }
  }, [user]);

  return (
    <div className="isolate">
      <Header />
      {isLearnPage ? <OverlaySidenav /> : <Sidenav />}
      <div
        className={clsx(
          'relative isolate mt-[var(--header-height)] min-h-screen bg-coachify-teal-1200 text-white',
          openSans.className
        )}
      >
        <div className="bg-coachify-gradient-2 absolute -z-10 h-screen w-full -translate-y-[var(--header-height)]">
          {/* <Image
            className="object-cover"
            src="/bg-quality-100.webp"
            fill
            alt=""
            unoptimized
            priority
          /> */}
        </div>
        <div
          className={clsx(
            'flex min-h-[calc(100vh-var(--header-height))] flex-col md:ml-16',
            isSidenavExpanded ? 'lg:ml-60' : 'lg:ml-16',
            isLearnPage && '!ml-0'
          )}
        >
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Layout;
