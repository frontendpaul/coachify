import clsx from 'clsx';

type Props = {
  intent?: 'primary';
  fill?: 'fill' | 'ghost'; // ghost -> text only, no bg
  icon?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  intent = 'primary',
  fill = 'fill',
  icon = false,
  fullWidth = false,
  children,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex gap-4 leading-none rounded-lg border border-transparent transition-200-out-quart',
        !icon && 'px-6 py-3',
        icon && 'p-2 text-2xl leading-none',
        intent === 'primary' &&
          !(fill === 'ghost') &&
          'font-semibold bg-coachify-cyan-300 text-coachify-teal-800 hover:bg-coachify-cyan-500',
        intent === 'primary' &&
          fill === 'ghost' &&
          'bg-transparent text-white hover:bg-coachify-teal-1000 hover:bg-opacity-20'
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
