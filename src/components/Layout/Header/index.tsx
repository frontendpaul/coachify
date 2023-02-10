import { useEffect, useState } from 'react';
import Logo from './Logo';
import Search from './Search';
import Button from '@ui/Button';
import { FiMenu, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { atom, useAtom } from 'jotai';
import LanguageSelect from '@ui/LanguageSelect';
import UserPopover from './UserPopover';
import clsx from 'clsx';
import AuthDialog, { AuthIntent } from './AuthDialog';
import { debounce } from 'utils/helpers';
import { useUser } from '@supabase/auth-helpers-react';
import SignedUserPopover from './SignedUserPopover';

export const isSidenavExpandedAtom = atom<boolean>(false);
export const isSidenavTransitioningAtom = atom<boolean>(false);
export const isAuthDialogOpenAtom = atom<boolean>(false);
export const authIntentAtom = atom<AuthIntent>('signup');

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
  }, [onScroll]);

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useAtom(isAuthDialogOpenAtom);
  const [authIntent, setAuthIntent] = useAtom(authIntentAtom);

  const openAuthDialog = (intent: AuthIntent) => {
    setAuthIntent(intent);
    setIsAuthDialogOpen(true);
  };

  // TODO: remove unused logs
  const user = useUser();
  useEffect(() => {
    if (user) setIsAuthDialogOpen(false);

    // console.log(user);
  }, [user, setIsAuthDialogOpen]);

  return (
    <header
      className={clsx(
        'fixed top-0 z-10 flex items-center justify-between gap-4 md:gap-8',
        'isolate w-full py-3 pl-3 pr-4 text-white md:pr-6',
        'before:bg-coachify-gradient before:pointer-events-none before:absolute before:inset-0 before:-z-10',
        'before:border-b before:border-white before:border-opacity-10',
        'before:transition-200-out-quart before:opacity-0',
        isWindowScrolled && 'before:opacity-100',
        isAuthDialogOpen && '!pr-10'
      )}
    >
      <div className="flex flex-shrink-0 items-center gap-4 md:gap-8">
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

      <div className="flex flex-shrink-0 items-center gap-4">
        <Button
          className="md:hidden"
          fill="ghost"
          icon="icon-only"
          aria-label="search-button"
        >
          <FiSearch />
        </Button>
        <LanguageSelect className="hidden md:block" />
        {user ? (
          <SignedUserPopover user={user} />
        ) : (
          <>
            <UserPopover
              className="lg:hidden"
              openAuthDialog={openAuthDialog}
            />
            <div className="hidden gap-4 lg:flex">
              <Button
                fill="ghost"
                icon="icon-left"
                onClick={() => openAuthDialog('login')}
              >
                Log In
              </Button>
              <Button onClick={() => openAuthDialog('signup')}>Sign Up</Button>
            </div>
            <AuthDialog
              open={isAuthDialogOpen}
              setIsOpen={setIsAuthDialogOpen}
              intent={authIntent}
              setAuthIntent={setAuthIntent}
            />
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
