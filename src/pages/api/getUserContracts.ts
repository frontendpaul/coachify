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

  const { id } = JSON.parse(req.body);

  const { data } = await supabaseServerClient
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
    .eq('buyer_id', id);

  res.status(200).json({ data });
}
