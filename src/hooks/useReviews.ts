import useSWR from 'swr';
import { Review } from 'types/supabase';

export default function useReviews(id: string) {
  const { data, error, isLoading } = useSWR<Review[]>(
    `/api/products/${id}/reviews`
  );

  return {
    reviews: data,
    isLoading,
    isError: error,
  };
}
