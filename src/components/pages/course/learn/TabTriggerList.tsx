import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import * as Tabs from '@radix-ui/react-tabs';
import TabTrigger from './TabTrigger';
import Button from '@components/ui/Button';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { useAtom } from 'jotai';
import { isMediumScreenAtom } from '@components/Layout';
import FavoriteProductButton from '@components/common/FavoriteProductButton';

const TabTriggerList = ({ productId }: { productId: string }) => {
  const sliderRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  const { events } = useDraggable(sliderRef);
  const [isMediumScreen] = useAtom(isMediumScreenAtom);

  return (
    <Tabs.List
      ref={sliderRef}
      {...events}
      className="scrollbar-hide flex justify-between gap-2 overflow-auto border-b border-white/10 py-2 md:gap-4 md:py-4 [&>*]:whitespace-nowrap"
    >
      <div>
        {isMediumScreen && <TabTrigger value="content" text="Content" />}
        <TabTrigger value="about" text="About" />
        <TabTrigger value="resources" text="Resources" />
        <TabTrigger value="discussion" text="Discussion" />
        <TabTrigger value="announcements" text="Announcements" />
        <TabTrigger value="reviews" text="Reviews" />
      </div>
      <div className="flex gap-2 md:gap-4">
        <FavoriteProductButton id={productId} />
        <Button fill="outline" icon="icon-left">
          <FiShare2 />
          Share
        </Button>
      </div>
    </Tabs.List>
  );
};
export default TabTriggerList;
