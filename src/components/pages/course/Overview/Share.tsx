import Button from '@components/ui/Button';
import DialogContent from '@components/ui/Dialog/DialogContent';
import InputWithLabel from '@components/ui/Inputs/InputWithLabel';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { FiShare2, FiX } from 'react-icons/fi';

type Props = {
  iconOnyly?: boolean;
};

const Share = ({ iconOnyly }: Props) => {
  const [isgOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isgOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button
          fill="outline"
          icon={iconOnyly ? 'icon-only' : 'icon-left'}
          title="Share"
        >
          <FiShare2 />
          <span className={iconOnyly ? 'sr-only' : ''}>Share</span>
        </Button>
      </Dialog.Trigger>
      <DialogContent>
        <div className="transition-200-out-quart relative w-[min(90vw,32rem)] overflow-hidden rounded-lg bg-coachify-teal-1100 p-4 text-white shadow-xl sm:my-8 sm:p-6">
          <Dialog.Close asChild>
            <Button
              fill="ghost"
              icon="icon-only"
              className="absolute top-2 right-2 sm:top-4 sm:right-4"
              aria-label="Close"
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
      </DialogContent>
    </Dialog.Root>
  );
};
export default Share;
