import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  const userId = user?.id ?? undefined;

  // if (!userId) {
  //   res.status(500).json({ message: 'user not found' });
  //   return;
  // }

  const { data: contracts, error } = await supabaseServerClient
    .from('contract')
    .select(
      `
    id,
    buyer_id,
    seller_id,
    product_id,
    created_at,
    updated_at
    `
    )
    .eq('buyer_id', userId);

  // TODO: better error handling and proper responses
  res.status(200).json(contracts || []);
}
