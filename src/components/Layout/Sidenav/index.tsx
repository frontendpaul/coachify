import { FiHome, FiSearch, FiX } from 'react-icons/fi';
import { AiOutlineTrophy } from 'react-icons/ai';
import ActiveLink from './ActiveLink';
import { useAtom } from 'jotai';
import { isSidenavExpandedAtom, isSidenavTransitioningAtom } from '../Header';
import clsx from 'clsx';
import Button from '@ui/Button';
import { isMobileAtom } from '..';

const Sidenav = () => {
  type Link = {
    name: string;
    text: string;
    href: string;
    icon?: React.ReactNode;
    iconImagePath?: string;
  };

  const links: Link[] = [
    {
      name: 'home',
      text: 'Home',
      href: '/',
      icon: <FiHome />,
    },
    {
      name: 'browse',
      text: 'Browse',
      href: '/browse',
      icon: <FiSearch />,
    },
    {
      name: 'ranking',
      text: 'Ranking',
      href: '/ranking',
      icon: <AiOutlineTrophy />,
    },
  ];

  const [isSidenavExpanded, setIsSidenavExpanded] = useAtom(
    isSidenavExpandedAtom
  );
  const [isSidenavTransitioning, setIsSidenavTransitioning] = useAtom(
    isSidenavTransitioningAtom
  );
  const [isMobile] = useAtom(isMobileAtom);

  const toggleSidenav = () => {
    setIsSidenavExpanded(!isSidenavExpanded);
    setIsSidenavTransitioning(true);
    setTimeout(() => setIsSidenavTransitioning(false), 200);
  };

  return (
    <aside>
      <div
        className={clsx(
          'fixed z-20 invisible inset-0 bg-coachify-teal-1300/75 backdrop-brightness-[.5] opacity-0 transition-200-out-quart lg:hidden',
          isSidenavExpanded && '!opacity-100 !visible',
          isSidenavTransitioning && '!visible'
        )}
        onClick={() => toggleSidenav()}
        aria-hidden
      ></div>
      <div
        className={clsx(
          'fixed z-40 top-0 lg:top-[var(--header-height)]',
          'h-screen lg:h-[calc(100vh-var(--header-height))]',
          'pb-6 pt-3 lg:pt-6 pl-3 bg-coachify-gradient lg:bg-none text-white',
          '-translate-x-60 lg:transform-none custom-scrollbar !overflow-x-hidden isolate',
          'invisible lg:!visible',
          isSidenavTransitioning && 'transition-x transition-200-out-quart',
          isSidenavExpanded
            ? 'w-60 pr-6 !translate-x-0 !visible'
            : 'w-60 lg:w-16 pr-3'
        )}
      >
        <div className="lg:hidden mb-9">
          <Button
            fill="ghost"
            icon="icon-only"
            onClick={() => toggleSidenav()}
            aria-label="close-sidenav-button"
            aria-controls="sidenav"
            aria-expanded={isSidenavExpanded}
          >
            <FiX />
          </Button>
        </div>
        <nav id="sidenav">
          <ul className="flex flex-col gap-2">
            {links.map((link, index) => (
              <li key={index}>
                <ActiveLink
                  href={link.href}
                  text={link.text}
                  icon={link.icon}
                  title={link.text}
                  onClick={() => {
                    isMobile && toggleSidenav();
                  }}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav
        id="icons-for-tablet"
        className={clsx(
          'hidden md:block lg:hidden fixed z-30 top-[var(--header-height)] h-[calc(100vh-var(--header-height))]',
          'text-white py-6 px-3  custom-scrollbar !overflow-x-hidden isolate w-16'
        )}
      >
        <ul className="flex flex-col gap-2">
          {links.map((link, index) => (
            <li key={index}>
              <ActiveLink
                href={link.href}
                text={link.text}
                icon={link.icon}
                title={link.text}
                onClick={() => {
                  isMobile && toggleSidenav();
                }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidenav;
