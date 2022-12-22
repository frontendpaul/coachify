import clsx from 'clsx';

type Props = {
  intent?: 'primary' | 'secondary' | 'danger';
  fill?: 'fill' | 'outline' | 'text';
  icon?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick: () => void;
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
        'flex gap-4 leading-none transition-all duration-200',
        intent === 'primary' &&
          `px-6 py-3 bg-coachify-cyan-300 text-coachify-teal-800 font-semibold rounded-lg
          hover:bg-coachify-cyan-500`
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
