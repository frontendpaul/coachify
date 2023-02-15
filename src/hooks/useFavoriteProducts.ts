import { useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';

export default function useFavoriteProducts() {
  const { data, error, isLoading } = useSWR('/api/users/products/favorites');

  const user = useUser();

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent) mutate('/api/users/products/favorites');

    return () => {
      isCurrent = false;
    };
  }, [user]);

  return {
    favorites: data,
    isLoading,
    isError: error,
  };
}
