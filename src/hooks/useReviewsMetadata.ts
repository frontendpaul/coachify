import useSWR from 'swr';
import { ReviewsMetadata } from 'types/supabase';

export default function useReviewsMetadata(id: string) {
  const { data, error, isLoading } = useSWR<ReviewsMetadata>(
    `/api/products/${id}/reviews/metadata`
  );

  return {
    metadata: data,
    isLoading,
    isError: error,
  };
}
