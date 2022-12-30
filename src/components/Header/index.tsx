import clsx from 'clsx';
import { useEffect, useCallback } from 'react';
import Logo from './Logo';
import Search from './Search';
import styles from './index.module.css';
import Button from '../Button';
import { FiMenu, FiGlobe, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const UserPopover = dynamic(() => import('./UserPopover'), {
  ssr: false,
});
const LanguageSelect = dynamic(() => import('./LanguageSelect'), {
  ssr: false,
});

const Header = ({ headerRef }: any) => {
  const onScroll = useCallback(() => {
    const { pageYOffset, scrollY } = window;
    const navBgOpacity = Math.min(pageYOffset / 200, 1);
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
    <header
      className={clsx(
        styles.container,
        'fixed z-10 flex justify-between items-center gap-4 md:gap-8 w-full pl-3 pr-6 py-2 md:py-3 transition-all text-white'
      )}
      ref={headerRef}
    >
      <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
        <Button fill="ghost" icon="icon-only">
          <FiMenu />
        </Button>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <Search className="hidden md:flex" />

      <div className="flex items-center gap-4 flex-shrink-0">
        <Button className="md:hidden" fill="ghost" icon="icon-only">
          <FiSearch />
        </Button>
        <LanguageSelect className="hidden md:block" />
        <UserPopover className="lg:hidden" />
        <div className="hidden lg:flex gap-4">
          <Button fill="ghost">Log In</Button>
          <Button onClick={() => console.log('click')}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
