import { useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Contract } from 'types/supabase';

export default function useUserContracts() {
  const { data, error, isLoading } = useSWR<Contract[]>('/api/users/contracts');

  const user = useUser();

  useEffect(() => {
    mutate('/api/users/contracts');
  }, [user]);

  return {
    contracts: data,
    isLoading,
    isError: error,
  };
}
