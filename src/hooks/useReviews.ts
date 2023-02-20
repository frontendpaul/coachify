import useSWR from 'swr';
import { Review } from 'types/supabase';

export default function useReviews(id: string, page?: string, size?: string) {
  let baseUrl = `/api/products/${id}/reviews`;
  if (page || size) baseUrl += '?';
  const searchParams = new URLSearchParams();
  page && searchParams.append('page', page);
  size && searchParams.append('size', size);

  const queryUrl = baseUrl + searchParams.toString();

  const { data, error, isLoading } = useSWR(queryUrl);

  return {
    reviews: data?.reviews as Review[],
    count: data?.count,
    page: data?.page,
    isLoading,
    isError: error,
  };
}
