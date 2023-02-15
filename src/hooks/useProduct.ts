import useSWR from 'swr';
import { Product } from 'types/supabase';

export default function useProduct(id: string) {
  const { data, error, isLoading } = useSWR<Product>(`/api/products/${id}`);

  return {
    product: data,
    isLoading,
    isError: error,
  };
}
