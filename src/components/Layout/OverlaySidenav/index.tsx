import { FiX } from 'react-icons/fi';
import ActiveLink from '../Sidenav/ActiveLink';
import { useAtom } from 'jotai';
import { isSidenavExpandedAtom, isSidenavTransitioningAtom } from '../Header';
import clsx from 'clsx';
import Button from '@ui/Button';
import { isMediumScreenAtom } from '..';
import { links } from '../Sidenav';
import { useEffect } from 'react';

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

  useEffect(() => {
    setIsSidenavExpanded(false);
  }, []);

  return (
    <aside>
      <div
        className={clsx(
          'fixed z-20 invisible inset-0 bg-coachify-teal-1300/75 backdrop-brightness-[.5] opacity-0 transition-200-out-quart',
          isSidenavExpanded && '!opacity-100 !visible',
          isSidenavTransitioning && '!visible'
        )}
        onClick={() => toggleSidenav()}
        aria-hidden
      ></div>
      <div
        className={clsx(
          'fixed z-40 top-0',
          'h-screen',
          'pb-6 pt-3 pl-3 bg-coachify-gradient text-white',
          '-translate-x-60 custom-scrollbar !overflow-x-hidden isolate',
          'invisible lg:!visible',
          isSidenavTransitioning &&
            'transition-x transition-200-out-quart !visible',
          isSidenavExpanded ? 'w-60 pr-6 !translate-x-0 !visible' : 'w-60 pr-3'
        )}
      >
        <div className="mb-9">
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
    </aside>
  );
};

export default Sidenav;
