import { useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Contract } from 'types/supabase';

export default function useUserContracts(userId: string) {
  const { data, error, isLoading } = useSWR<Contract[]>(
    `/api/users/contracts?user=${userId}`
  );

  const user = useUser();

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent) mutate(`/api/users/contracts?user=${userId}`);

    return () => {
      isCurrent = false;
    };
  }, [user]);

  return {
    contracts: data,
    isLoading,
    isError: error,
  };
}
