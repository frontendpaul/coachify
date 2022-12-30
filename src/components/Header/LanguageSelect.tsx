import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FiGlobe } from 'react-icons/fi';
import Button from '../Button';

const LanguageSelect = ({ className }: { className?: string }) => {
  return (
    <Popover className={clsx(className, 'relative')}>
      <Popover.Button as="div">
        <Button fill="ghost" icon="icon-only">
          <FiGlobe />
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
        <Popover.Panel className="absolute z-10 right-0 lg:right-1/2 lg:translate-x-1/2 mt-3 md:mt-4 w-40 flex flex-col gap-2 p-4 rounded-xl bg-coachify-teal-800 shadow-lg">
          <Button fill="ghost">English</Button>
          <Button fill="ghost" onClick={() => console.log('click')}>
            Deutsch
          </Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default LanguageSelect;
