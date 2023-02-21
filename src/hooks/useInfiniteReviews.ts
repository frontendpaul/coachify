import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
const PAGE_SIZE = 10;

export default function useInfiniteReviews(productId: string) {
  const { data, mutate, size, setSize, isLoading, isValidating } =
    useSWRInfinite(
      (index) =>
        `/api/products/${productId}/reviews?page=${
          index + 1
        }&size=${PAGE_SIZE}`,
      { revalidateAll: true }
    );

  const reviews = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    data: reviews,
    mutate,
    size,
    setSize,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
  };
}
