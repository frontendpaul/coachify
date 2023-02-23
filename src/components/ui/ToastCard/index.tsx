import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { FiCheck, FiX } from 'react-icons/fi';
import styles from './ToastCard.module.css';

type Props = {
  isOpen: boolean;
  setIsOpen: any;
  intent: 'error' | 'success' | 'info';
  title: string;
  message?: string;
  action?: any;
};

const ToastCard = ({
  isOpen,
  setIsOpen,
  intent,
  title,
  message,
  action,
}: Props) => {
  return (
    <Toast.Root
      className={clsx(
        'max-w-sm rounded-lg bg-coachify-teal-1100 p-3 text-sm shadow-lg md:p-4',
        styles.card
      )}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex gap-3">
        {(intent === 'error' || intent === 'success') && (
          <div
            className={clsx(
              'mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full text-coachify-teal-1100',
              intent === 'error' && 'bg-red-600',
              intent === 'success' && 'bg-green-600'
            )}
          >
            {intent === 'error' && <FiX className="[stroke-width:3]" />}
            {intent === 'success' && (
              <FiCheck className="translate-y-px [stroke-width:3]" />
            )}
          </div>
        )}
        <div>
          <Toast.Title
            className={clsx(
              'font-bold',
              intent === 'error' && 'text-red-600',
              intent === 'success' && 'text-green-600'
            )}
          >
            {title}
          </Toast.Title>
          {message && (
            <Toast.Description asChild>
              <p className="mt-1 text-coachify-gray-300">{message}</p>
            </Toast.Description>
          )}
        </div>
        {action && (
          <Toast.Action className="" asChild altText="Goto schedule to undo">
            <button className="">Undo</button>
          </Toast.Action>
        )}
      </div>
    </Toast.Root>
  );
};
export default ToastCard;
