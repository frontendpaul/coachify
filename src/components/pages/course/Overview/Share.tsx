import Button from '@components/ui/Button';
import InputWithLabel from '@components/ui/InputWithLabel';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { FiShare2, FiX } from 'react-icons/fi';

const Share = () => {
  const [isgOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isgOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button fill="outline" icon="icon-only" onClick={() => setIsOpen(true)}>
          <FiShare2 />
          <span className="sr-only">Share</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-coachify-teal-1300/75 backdrop-brightness-[.5] data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-enter data-[state=closed]:animate-leave">
          <div className="transition-200-out-quart relative w-[min(90vw,32rem)] overflow-hidden rounded-lg bg-coachify-teal-1100 p-4 text-white shadow-xl sm:my-8 sm:p-6">
            <Dialog.Close asChild>
              <Button
                fill="ghost"
                icon="icon-only"
                className="absolute top-2 right-2 sm:top-4 sm:right-4"
                aria-label="close-dialog-button"
              >
                <FiX />
              </Button>
            </Dialog.Close>
            <div className="grid gap-6">
              <Dialog.Title className="text-xl font-medium">
                It pays to share
              </Dialog.Title>
              <Dialog.Description className="text-coachify-gray-200">
                When you share a course with a friend, you both get rewarded.
                That&apos;s right - you and your friend both will receive a{' '}
                <strong className="text-coachify-teal-500">10% discount</strong>{' '}
                on your next purchase. Plus, it&apos;s a great way to show your
                friends that you care about them. So don&apos;t wait - share a
                course with a friend today!{' '}
                <LinkWithChevron
                  className="inline-flex text-base underline"
                  href={'/'}
                  text={'Learn more'}
                />
              </Dialog.Description>
              <InputWithLabel
                label="Email address of your friend"
                id="email"
                type="email"
              />
              <div className="flex justify-end">
                <Button>Send an email</Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default Share;
