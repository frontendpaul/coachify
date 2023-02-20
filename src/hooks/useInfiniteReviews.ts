import useSWRInfinite from 'swr/infinite';
const PAGE_SIZE = 10;

export default function useInfiniteReviews(productId: string) {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) =>
      `/api/products/${productId}/reviews?page=${index + 1}&size=${PAGE_SIZE}`
  );

  const reviews = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    data: reviews,
    size,
    setSize,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
}
