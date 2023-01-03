import { FiHome, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { AiOutlineTrophy } from 'react-icons/ai';
import ActiveLink from './ActiveLink';
import { useAtom } from 'jotai';
import { isSidenavExpandedAtom, isSidenavTransitioningAtom } from '../Header';
import clsx from 'clsx';
import Button from '../Button';

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

  const toggleSidenav = () => {
    setIsSidenavExpanded(!isSidenavExpanded);
    setIsSidenavTransitioning(true);
    setTimeout(() => setIsSidenavTransitioning(false), 200);
  };

  return (
    <aside
      className={clsx(
        `fixed z-10 
        top-0 md:top-[var(--header-height)]
        h-screen md:h-[calc(100vh-var(--header-height))]
        pb-6 pt-3 md:pt-6 pl-3 
        overflow-hidden bg-coachify-gradient md:bg-none text-white
        -translate-x-60 md:transform-none
         md:!transition-none`,
        isSidenavTransitioning && 'transition-x transition-200-out-quart',
        isSidenavExpanded ? 'w-60 pr-6 !translate-x-0' : 'w-60 md:w-16 pr-3'
      )}
    >
      <div className="md:hidden mb-9">
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
        <ul className="flex flex-col gap-3">
          {links.map((link, index) => (
            <li key={index}>
              <ActiveLink href={link.href} text={link.text} icon={link.icon} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidenav;
