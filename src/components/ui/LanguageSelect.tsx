import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FiCheck, FiChevronDown, FiGlobe } from 'react-icons/fi';
import Button from '@ui/Button';
import { atom, useAtom } from 'jotai';

type Language = {
  id: string;
  name: string;
};

const languages: Language[] = [
  {
    id: 'en_US',
    name: 'English',
  },
  {
    id: 'de_DE',
    name: 'Deutsch',
  },
];

export const selectedLanguageAtom = atom<Language>(languages[0]);

const LanguageSelect = ({
  className,
  footer,
}: {
  className?: string;
  footer?: boolean;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);

  const button = footer ? (
    <Button
      fill="ghost"
      icon="icon-both"
      aria-label="language-select-button"
      className="border !border-white"
    >
      <FiGlobe />
      {selectedLanguage.name}
      <FiChevronDown />
    </Button>
  ) : (
    <Button fill="ghost" icon="icon-only" aria-label="language-select-button">
      <FiGlobe />
    </Button>
  );

  return (
    <div className={clsx('w-min relative', className)}>
      <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
        <Listbox.Button as={React.Fragment}>{button}</Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options
            className={clsx(
              'absolute z-10 right-0 lg:right-1/2 lg:translate-x-1/2 flex flex-col gap-1 mt-4 p-4 rounded-xl bg-coachify-teal-800 shadow-lg',
              footer ? 'w-full' : 'w-40'
            )}
          >
            {languages.map((language) => (
              <Listbox.Option
                key={language.id}
                value={language}
                className={clsx(
                  'flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-white/5',
                  language.id === selectedLanguage.id && 'active'
                )}
              >
                {language.name}
                {language.id === selectedLanguage.id && <FiCheck />}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
export default LanguageSelect;
