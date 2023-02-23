import ToastCard from '@components/ui/ToastCard';
import { useState } from 'react';
import { Review } from 'types/supabase';
import ReviewDialog from './ReviewDialog';

type Props = {
  productId: string;
  userReview?: Review;
  isOpen: boolean;
  setIsOpen: any;
};

const ReviewDialogWrapper = ({
  productId,
  userReview,
  isOpen,
  setIsOpen,
}: Props) => {
  const [isPublishToastOpen, setIsPublishToastOpen] = useState(false);
  const [isUpdateToastOpen, setIsUpdateToastOpen] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  return (
    <>
      <ReviewDialog
        productId={productId}
        userReview={userReview}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsPublishToastOpen={setIsPublishToastOpen}
        setIsUpdateToastOpen={setIsUpdateToastOpen}
        setIsErrorToastOpen={setIsErrorToastOpen}
      />

      {isPublishToastOpen && (
        <PublishToast
          isOpen={isPublishToastOpen}
          setIsOpen={setIsPublishToastOpen}
        />
      )}
      {isUpdateToastOpen && (
        <UpdateToast
          isOpen={isUpdateToastOpen}
          setIsOpen={setIsUpdateToastOpen}
        />
      )}
      {isErrorToastOpen && (
        <ErrorToast isOpen={isErrorToastOpen} setIsOpen={setIsErrorToastOpen} />
      )}
    </>
  );
};
export default ReviewDialogWrapper;

const PublishToast = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <ToastCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      intent="success"
      title="Your review has been published"
    />
  );
};

const UpdateToast = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <ToastCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      intent="success"
      title="Your review has been updated"
    />
  );
};

const ErrorToast = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <ToastCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      intent="error"
      title="Something went wrong"
      message="Please try again"
    />
  );
};
