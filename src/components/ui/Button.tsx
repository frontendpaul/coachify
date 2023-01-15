import clsx from 'clsx';
import { forwardRef } from 'react';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  fill?: 'fill' | 'ghost'; // ghost -> text only, no bg
  fullWidth?: boolean;
  icon?: 'icon-only' | 'icon-left' | 'icon-right' | 'icon-both';
  intent?: 'primary' | 'secondary'; // Color variants, more to come
  type?: 'submit' | 'reset' | 'button';
  className?: string;
}

const ButtonElement = (
  {
    children,
    fill = 'fill',
    fullWidth = false,
    icon,
    intent = 'primary',
    type = 'button',
    className,
    ...props
  }: Props,
  ref: any
) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'flex justify-center gap-4 leading-none rounded-lg border border-transparent transition-200-out-quart',
        fullWidth && 'w-full',
        !icon && 'px-6 py-3',
        icon === 'icon-only' && 'p-[10px] text-xl',
        icon === 'icon-left' && 'pl-4 pr-6 py-3',
        icon === 'icon-right' && 'pl-6 pr-4 py-3',
        icon === 'icon-both' && 'px-4 py-3',
        intent === 'primary' &&
          !(fill === 'ghost') &&
          'font-semibold bg-coachify-cyan-700 text-coachify-teal-1000 hover:bg-coachify-cyan-600',
        intent === 'secondary' &&
          !(fill === 'ghost') &&
          'font-semibold bg-amber-400 text-coachify-teal-1000 hover:bg-yellow-400',
        intent === 'primary' &&
          fill === 'ghost' &&
          'bg-transparent text-white hover:bg-white/5',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

const Button = forwardRef(ButtonElement);

export default Button;
