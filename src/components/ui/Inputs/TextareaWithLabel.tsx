import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
};

const InputWithLabel = ({
  label,
  id,
  name = id,
  placeholder,
  ...props
}: Props) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="text-sm leading-none text-coachify-gray-300"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
        className="transition-200-out-quart custom-scrollbar resize-none rounded-lg border 
        border-transparent bg-coachify-teal-1300/50 px-4 py-2 text-white outline-none
        focus-within:border-white/10 focus-within:bg-coachify-teal-1300/75 focus-visible:outline-none"
      ></textarea>
    </div>
  );
};
export default InputWithLabel;
