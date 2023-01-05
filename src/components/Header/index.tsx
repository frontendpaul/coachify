import { useEffect, useCallback, useState } from 'react';
import Logo from './Logo';
import Search from './Search';
import Button from '../Button';
import { FiMenu, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { atom, useAtom } from 'jotai';
import LanguageSelect from './LanguageSelect';
import UserPopover from './UserPopover';
import clsx from 'clsx';
import debounce from '../../helpers/debounce';

// const UserPopover = dynamic(() => import('./UserPopover'), {
//   ssr: false,
// });
// const LanguageSelect = dynamic(() => import('./LanguageSelect'), {
//   ssr: false,
// });

export const isSidenavExpandedAtom = atom<boolean>(true);
export const isSidenavTransitioningAtom = atom<boolean>(false);

const Header = () => {
  const [isSidenavExpanded, setIsSidenavExpanded] = useAtom(
    isSidenavExpandedAtom
  );

  const [, setIsSidenavTransitioning] = useAtom(isSidenavTransitioningAtom);
  const toggleSidenav = () => {
    setIsSidenavExpanded(!isSidenavExpanded);
    setIsSidenavTransitioning(true);
    setTimeout(() => setIsSidenavTransitioning(false), 200);
  };

  const [isWindowScrolled, setIsWindowScrolled] = useState(false);

  const onScroll = debounce(() => {
    const { pageYOffset } = window;
    if (pageYOffset > 0) {
      setIsWindowScrolled(true);
    } else {
      setIsWindowScrolled(false);
    }
  }, 25);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        `fixed top-0 z-10 flex justify-between items-center gap-4 md:gap-8 
        w-full pl-3 pr-4 md:pr-6 py-3 isolate text-white 
        before:absolute before:-z-10 before:inset-0 before:bg-coachify-gradient before:pointer-events-none 
        before:border-b before:border-white before:border-opacity-10 
        before:opacity-0 before:transition-200-out-quart`,
        isWindowScrolled && 'before:opacity-100'
      )}
    >
      <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
        <Button
          fill="ghost"
          icon="icon-only"
          onClick={() => toggleSidenav()}
          aria-label="sidenav-button"
          aria-controls="sidenav"
          aria-expanded={isSidenavExpanded}
        >
          <FiMenu />
        </Button>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <Search className="hidden md:flex" />

      <div className="flex items-center gap-4 flex-shrink-0">
        <Button
          className="md:hidden"
          fill="ghost"
          icon="icon-only"
          aria-label="search-button"
        >
          <FiSearch />
        </Button>
        <LanguageSelect className="hidden md:block" />
        <UserPopover className="lg:hidden" />
        <div className="hidden lg:flex gap-4">
          <Button fill="ghost" icon="icon-left">
            Log In
          </Button>
          <Button onClick={() => console.log('click')}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
