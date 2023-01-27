import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'; // ...
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
};

const InputWithLabel = ({
  type = 'text',
  label,
  id,
  name = id,
  placeholder,
  ...props
}: Props) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-white/75 leading-none">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
        className="px-4 py-2 rounded-lg bg-coachify-teal-1300/50 text-white
        border border-transparent transition-200-out-quart outline-none
        focus-within:border-white/10 focus-within:bg-coachify-teal-1300/75 focus-visible:outline-none"
      />
    </div>
  );
};
export default InputWithLabel;
