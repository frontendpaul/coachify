import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import Button from '@ui/Button';

const UserPopover = ({
  className,
  openAuthDialog,
}: {
  className?: string;
  openAuthDialog: any;
}) => {
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
        <Popover.Panel className="absolute z-10 right-0 mt-4 w-40 flex flex-col gap-1 p-4 rounded-xl bg-coachify-teal-1100 shadow-lg">
          <Button fill="ghost" onClick={() => openAuthDialog('login')}>
            Log In
          </Button>
          <Button onClick={() => openAuthDialog('signup')}>Sign Up</Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default UserPopover;
