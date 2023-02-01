import * as Tabs from '@radix-ui/react-tabs';

type Props = {
  value: string;
  text: string;
};

const TabTrigger = ({ value, text }: Props) => {
  return (
    <Tabs.Trigger
      value={value}
      className="transition-200-out-quart before:transition-200-out-quart relative py-2 px-4 font-medium 
      before:absolute before:-bottom-2 before:left-0 before:h-0.5 before:w-full 
    before:bg-coachify-teal-500 before:bg-opacity-0 hover:text-coachify-teal-500 
    data-[state=active]:text-coachify-teal-500 before:data-[state=active]:bg-opacity-100
      md:px-6 md:before:-bottom-4"
    >
      {text}
    </Tabs.Trigger>
  );
};
export default TabTrigger;
