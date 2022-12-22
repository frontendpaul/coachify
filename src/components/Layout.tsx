import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import Header from './Header';
import styles from './Layout.module.css';

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
        className={clsx(
          styles.container,
          'min-h-screen flex items-start flex-1 text-white'
        )}
        style={{ paddingTop: navHeight }}
      >
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
