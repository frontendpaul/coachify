import { Open_Sans } from '@next/font/google';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

  return (
    <div className="isolate">
      <Header />
      {isLearnPage ? <OverlaySidenav /> : <Sidenav />}
      <div
        className={clsx(
          'min-h-screen text-white relative isolate bg-coachify-teal-1200 mt-[var(--header-height)]',
          openSans.className
        )}
      >
        <div className="absolute -z-10 w-full h-screen -translate-y-[var(--header-height)]">
          <Image
            className="object-cover"
            src="/bg-quality-100.webp"
            fill
            alt=""
            unoptimized
            priority
          />
        </div>
        <div
          className={clsx(
            'flex flex-col min-h-[calc(100vh-var(--header-height))] md:ml-16',
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
