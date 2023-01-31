import * as Tabs from '@radix-ui/react-tabs';

type Props = {
  value: string;
  text: string;
};

const TabTrigger = ({ value, text }: Props) => {
  return (
    <Tabs.Trigger
      value={value}
      className="py-2 px-4 md:px-6 relative
    font-medium
    transition-200-out-quart
  hover:text-coachify-teal-500
  data-[state=active]:text-coachify-teal-500
    before:absolute before:-bottom-2 md:before:-bottom-4 before:left-0 
    before:h-0.5 before:w-full 
    before:bg-coachify-teal-500 before:bg-opacity-0
    before:transition-200-out-quart
    before:data-[state=active]:bg-opacity-100"
    >
      {text}
    </Tabs.Trigger>
  );
};
export default TabTrigger;
