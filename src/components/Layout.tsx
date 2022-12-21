import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import ActiveLink from './ActiveLink';
import styles from './Layout.module.css';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): React.ReactElement => {
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState<number>(40);
  useEffect(() => {
    setNavHeight(navRef.current?.offsetHeight as number);
  }, [navRef]);

  const onScroll = useCallback(() => {
    const { pageYOffset, scrollY } = window;
    const navBgOpacity = Math.min(pageYOffset / 50, 1);
    console.log(navBgOpacity);
    document.documentElement.style.setProperty(
      '--nav-bg-opacity',
      navBgOpacity.toString()
    );

    console.log('yOffset', pageYOffset, 'scrollY', scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header
        className="fixed z-10 w-full px-8 py-2 transition-all text-white nav-bar"
        ref={navRef}
      >
        <ActiveLink
          activeClassName="text-blue-500"
          className="mr-5 transition-all duration-150"
          href={'/'}
        >
          Home
        </ActiveLink>
        <ActiveLink
          activeClassName="text-blue-500"
          className="mr-5 transition-all duration-150"
          href={'/explore'}
        >
          Explore
        </ActiveLink>
        <ActiveLink
          activeClassName="text-blue-500"
          className="mr-5 transition-all duration-150"
          href={'/ranking'}
        >
          Ranking
        </ActiveLink>
        <a href="#footer">footer</a>
      </header>
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
