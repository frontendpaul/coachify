import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import Button from '@ui/Button';
import { useAtom } from 'jotai';
import { isLoginDialogOpenAtom } from './AuthDialog/Login';
import { isSignupDialogOpenAtom } from './AuthDialog/Signup';

const UserPopover = ({ className }: { className?: string }) => {
  const [, setIsLoginDialogOpen] = useAtom(isLoginDialogOpenAtom);
  const [, setIsSignupDialogOpen] = useAtom(isSignupDialogOpenAtom);

  return (
    <Popover className={clsx(className, 'relative')}>
      <Popover.Button as={React.Fragment}>
        <Button icon="icon-only" aria-label="user-menu-button">
          <FiUser />
        </Button>
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-4 flex w-40 flex-col rounded-xl bg-coachify-teal-1100 p-2 shadow-lg">
          <Button fill="ghost" onClick={() => setIsLoginDialogOpen(true)}>
            Log In
          </Button>
          <Button onClick={() => setIsSignupDialogOpen(true)}>Sign Up</Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default UserPopover;
