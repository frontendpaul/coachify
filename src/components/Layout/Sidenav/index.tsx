import { FiHome, FiSearch, FiX } from 'react-icons/fi';
import { AiOutlineTrophy } from 'react-icons/ai';
import ActiveLink from './ActiveLink';
import { useAtom } from 'jotai';
import { isSidenavExpandedAtom, isSidenavTransitioningAtom } from '../Header';
import clsx from 'clsx';
import Button from '@ui/Button';
import { isMediumScreenAtom } from '..';

type Link = {
  name: string;
  text: string;
  href: string;
  icon?: React.ReactNode;
  iconImagePath?: string;
};

export const links: Link[] = [
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

const Sidenav = () => {
  const [isSidenavExpanded, setIsSidenavExpanded] = useAtom(
    isSidenavExpandedAtom
  );
  const [isSidenavTransitioning, setIsSidenavTransitioning] = useAtom(
    isSidenavTransitioningAtom
  );
  const [isMediumScreen] = useAtom(isMediumScreenAtom);

  const toggleSidenav = () => {
    setIsSidenavExpanded(!isSidenavExpanded);
    setIsSidenavTransitioning(true);
    setTimeout(() => setIsSidenavTransitioning(false), 200);
  };

  return (
    <aside>
      <div
        className={clsx(
          'transition-200-out-quart invisible fixed inset-0 z-20 bg-coachify-teal-1300/75 opacity-0 backdrop-brightness-[.5] lg:hidden',
          isSidenavExpanded && '!visible !opacity-100',
          isSidenavTransitioning && '!visible'
        )}
        onClick={() => toggleSidenav()}
        aria-hidden
      ></div>
      <div
        className={clsx(
          'fixed top-0 z-40 lg:top-[var(--header-height)]',
          'h-screen lg:h-[calc(100vh-var(--header-height))]',
          'bg-coachify-gradient px-3 pb-6 pt-3 text-white lg:bg-none lg:pt-6',
          'custom-scrollbar isolate -translate-x-60 !overflow-x-hidden lg:transform-none',
          'invisible lg:!visible',
          isSidenavTransitioning &&
            'transition-x transition-200-out-quart !visible',
          isSidenavExpanded ? '!visible w-60 !translate-x-0' : 'w-60 lg:w-16'
        )}
      >
        <div className="mb-9 lg:hidden">
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
                    isMediumScreen && toggleSidenav();
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
          'fixed top-[var(--header-height)] z-30 hidden h-[calc(100vh-var(--header-height))] md:block lg:hidden',
          'custom-scrollbar isolate w-16  !overflow-x-hidden py-6 px-3 text-white'
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
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidenav;
