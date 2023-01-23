import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import Button from '@ui/Button';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';

const SignedUserPopover = ({
  className,
  user,
}: {
  className?: string;
  user: any;
}) => {
  const supabaseClient = useSupabaseClient();

  return (
    <Popover className={clsx(className, 'relative')}>
      <Popover.Button as={React.Fragment}>
        <Button
          icon="icon-only"
          aria-label="user-menu-button"
          className="lg:text-base lg:pl-4 lg:pr-6 lg:py-3"
        >
          <FiUser />
          <span className="hidden lg:block">{user?.user_metadata?.name}</span>
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
        <Popover.Panel className="absolute z-10 right-0 mt-4 w-40 flex flex-col gap-1 p-4 rounded-xl bg-coachify-teal-800 shadow-lg">
          <Button fill="ghost" onClick={() => supabaseClient.auth.signOut()}>
            Sign Out
          </Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default SignedUserPopover;
