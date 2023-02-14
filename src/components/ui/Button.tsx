import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef, ReactEventHandler } from 'react';

type Props = {
  children: React.ReactNode;
  fill?: 'fill' | 'ghost' | 'outline'; // ghost -> text only, no bg
  fullWidth?: boolean;
  icon?: 'icon-only' | 'icon-left' | 'icon-right' | 'icon-both';
  intent?: 'primary' | 'secondary'; // Color variants, more to come
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  disabled?: boolean;
  className?: string;
  onClick?: ReactEventHandler;
  [x: string]: any; // additional props
};

const ButtonElement = (
  {
    children,
    fill = 'fill',
    fullWidth = false,
    icon,
    intent = 'primary',
    type = 'button',
    href,
    disabled,
    className,
    ...props
  }: Props,
  ref: any
) => {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          'transition-200-out-quart flex justify-center gap-4 rounded-lg border border-transparent leading-none [&>*]:leading-none',
          fullWidth && 'w-full',
          !icon && 'px-6 py-3',
          icon === 'icon-only' && 'p-[10px] text-xl',
          icon === 'icon-left' && 'py-3 pl-4 pr-6',
          icon === 'icon-right' && 'py-3 pl-6 pr-4',
          icon === 'icon-both' && 'px-4 py-3',
          intent === 'primary' &&
            !(fill === 'ghost') &&
            'bg-coachify-teal-500 font-semibold text-coachify-teal-1300 hover:bg-coachify-teal-400',
          intent === 'secondary' &&
            !(fill === 'ghost') &&
            'bg-amber-400 font-semibold text-coachify-teal-1300 hover:bg-yellow-400',
          intent === 'primary' &&
            fill === 'ghost' &&
            'bg-transparent text-white hover:bg-white/5',
          intent === 'primary' &&
            fill === 'outline' &&
            '!border-white !bg-transparent font-normal !text-white hover:!bg-white/5',
          disabled && 'pointer-events-none !opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref}
      className={clsx(
        'transition-200-out-quart flex justify-center gap-4 rounded-lg border border-transparent leading-none [&>*]:leading-none',
        fullWidth && 'w-full',
        !icon && 'px-6 py-3',
        icon === 'icon-only' && 'p-[10px] text-xl',
        icon === 'icon-left' && 'py-3 pl-4 pr-6',
        icon === 'icon-right' && 'py-3 pl-6 pr-4',
        icon === 'icon-both' && 'px-4 py-3',
        intent === 'primary' &&
          !(fill === 'ghost') &&
          'bg-coachify-teal-500 font-semibold text-coachify-teal-1300 hover:bg-coachify-teal-400',
        intent === 'secondary' &&
          !(fill === 'ghost') &&
          'bg-amber-400 font-semibold text-coachify-teal-1300 hover:bg-yellow-400',
        intent === 'primary' &&
          fill === 'ghost' &&
          'bg-transparent text-white hover:bg-white/5',
        intent === 'primary' &&
          fill === 'outline' &&
          '!border-white !bg-transparent font-normal !text-white hover:!bg-white/5',
        disabled && 'pointer-events-none !opacity-50',
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
