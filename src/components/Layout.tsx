import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Header from './Header';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): React.ReactElement => {
  const headerRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState<number>(66);
  useEffect(() => {
    setNavHeight(headerRef.current?.offsetHeight as number);
  }, [headerRef]);

  return (
    <>
      <Header headerRef={headerRef} />
      <div
        className={
          'min-h-screen flex items-start flex-1 text-white relative isolate bg-coachify-teal-1000'
        }
        style={{ paddingTop: navHeight }}
      >
        <div
          className="absolute -z-10 w-full h-screen"
          style={{ transform: `translateY(${-navHeight}px)` }}
        >
          <Image
            className="object-cover"
            src="/coachify-bg-3-min.png"
            fill
            alt=""
            unoptimized
            priority
          />
        </div>
        <aside
          className="h-96 sticky"
          style={{ top: navHeight, height: '120vh' }}
        >
          Sidebar
        </aside>
        <div className="flex-1 flex flex-col" style={{ height: '200vh' }}>
          <main>{children}</main>
          <footer id="footer" className="mt-auto">
            Footer
          </footer>
        </div>
      </div>
    </>
  );
};
export default Layout;
