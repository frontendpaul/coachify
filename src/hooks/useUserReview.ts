import useSWR from 'swr';
import { Review } from 'types/supabase';

export default function useUserReview(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/products/${id}/reviews/user-review`
  );

  return {
    data: data as Review[],
    isLoading,
    isError: error,
  };
}
