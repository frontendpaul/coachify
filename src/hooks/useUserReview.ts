import useSWR from 'swr';
import { Review } from 'types/supabase';

export default function useUserReview(id: string, userId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/products/${id}/reviews/user-review?user=${userId}`
  );

  return {
    data: data as Review[],
    isLoading,
    isError: error,
  };
}
