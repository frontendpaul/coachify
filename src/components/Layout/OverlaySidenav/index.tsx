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
          'transition-200-out-quart invisible fixed inset-0 z-20 bg-coachify-teal-1300/75 opacity-0 backdrop-brightness-[.5]',
          isSidenavExpanded && '!visible !opacity-100',
          isSidenavTransitioning && '!visible'
        )}
        onClick={() => toggleSidenav()}
        aria-hidden
      ></div>
      <div
        className={clsx(
          'fixed top-0 z-40',
          'h-screen',
          'bg-coachify-gradient px-3 pb-6 pt-3 text-white',
          'custom-scrollbar isolate -translate-x-60 !overflow-x-hidden',
          'invisible lg:!visible',
          isSidenavTransitioning &&
            'transition-x transition-200-out-quart !visible',
          isSidenavExpanded && '!visible w-60 !translate-x-0'
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
