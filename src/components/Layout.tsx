import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import Header, { isSidenavExpandedAtom } from './Header';
import Sidenav from './Sidenav';

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
    const isMobile = windowWidth < 768;
    setIsMobile(isMobile);
    setIsSidenavExpanded(!isMobile);
  }, [windowWidth]);

  return (
    <>
      <Header />
      <Sidenav />
      <div
        className={
          'min-h-screen flex items-start flex-1 text-white relative isolate bg-coachify-teal-1000 mt-[var(--header-height)]'
        }
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
            'flex-1 flex flex-col',
            isSidenavExpanded ? 'md:ml-60' : 'md:ml-16'
          )}
        >
          <main className="p-6 h-[200vh]">{children}</main>
          <footer id="footer" className="mt-auto">
            Footer
          </footer>
        </div>
      </div>
    </>
  );
};
export default Layout;
