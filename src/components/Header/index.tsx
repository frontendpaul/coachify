import clsx from 'clsx';
import { useEffect, useCallback } from 'react';
import Logo from './Logo';
import Search from './Search';
import styles from './index.module.css';
import Button from '../Button';

const Header = ({ headerRef }: any) => {
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
    <header
      className={clsx(
        styles.container,
        'fixed z-10 flex justify-between w-full px-6 py-3 transition-all text-white'
      )}
      ref={headerRef}
    >
      <div className="flex gap-6 flex-shrink-0">
        <button>X</button>
        <Logo />
      </div>
      <Search />
      <div className="flex gap-6 flex-shrink-0">
        <button>lang</button>
        <button>Log In</button>
        <Button onClick={() => console.log('click')}>Sign Up</Button>
      </div>
    </header>
  );
};
export default Header;
