import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

type ContentProps = {
  children: React.ReactNode;
};

const DialogContent = React.forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    return (
      <Dialog.Overlay
        ref={ref}
        className="fixed inset-0 grid place-items-center overflow-y-auto bg-coachify-teal-1300/75 backdrop-brightness-[.5] data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut"
      >
        <Dialog.Content
          ref={ref}
          className="data-[state=open]:animate-enter data-[state=closed]:animate-leave"
        >
          {props.children}
        </Dialog.Content>
      </Dialog.Overlay>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export default DialogContent;
