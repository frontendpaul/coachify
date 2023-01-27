import { Open_Sans } from '@next/font/google';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import Footer from './Footer';
import Header, { isSidenavExpandedAtom } from './Header';
import Sidenav from './Sidenav';

const openSans = Open_Sans({ subsets: ['latin'] });

type Props = {
  children?: React.ReactNode;
};

export const isMobileAtom = atom<boolean>(true);

const Layout = ({ children }: Props): React.ReactElement => {
  const [isSidenavExpanded, setIsSidenavExpanded] = useAtom(
    isSidenavExpandedAtom
  );
  const [, setIsMobile] = useAtom(isMobileAtom);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const isMediumScreen = windowWidth < 1024;
    const isMobile = windowWidth < 768;
    setIsMobile(isMobile);
    setIsSidenavExpanded(!isMediumScreen);
  }, [windowWidth, setIsMobile, setIsSidenavExpanded]);

  return (
    <div className="isolate">
      <Header />
      <Sidenav />
      <div
        className={clsx(
          'min-h-screen text-white relative isolate bg-coachify-teal-900 mt-[var(--header-height)]',
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
            'flex flex-col min-h-[calc(100vh-var(--header-height))]',
            isSidenavExpanded ? 'md:ml-60' : 'md:ml-16'
          )}
        >
          <main className="py-6 flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Layout;
