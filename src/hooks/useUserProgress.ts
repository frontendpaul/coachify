import useSWR from 'swr';
import { Progress } from 'types/supabase';

export default function useUserProgress(id: string) {
  const { data, error, isLoading } = useSWR<Progress>(
    `/api/users/products/${id}/progress`
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}
