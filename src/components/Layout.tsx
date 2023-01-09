import { Open_Sans } from '@next/font/google';
import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
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
  }, [windowWidth]);

  return (
    <>
      <Header />
      <Sidenav />
      <div
        className={clsx(
          'min-h-screen text-white relative isolate bg-coachify-teal-1000 mt-[var(--header-height)]',
          openSans.className
        )}
      >
        <div className="absolute -z-10 w-full h-screen -translate-y-[var(--header-height)]">
          <Image
            className="object-cover"
            src="/coachify-bg-3-min.webp"
            fill
            alt=""
            unoptimized
            priority
          />
        </div>
        <div
          className={clsx(
            'flex flex-col',
            isSidenavExpanded ? 'md:ml-60' : 'md:ml-16'
          )}
        >
          <main className="py-6 h-[200vh]">{children}</main>
          <footer id="footer" className="mt-auto">
            Footer
          </footer>
        </div>
      </div>
    </>
  );
};
export default Layout;
