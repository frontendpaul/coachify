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

  const { data: favorites, error } = await supabaseServerClient
    .from('favorite_product')
    .select(
      `
    id,
    user_id,
    product_id
    `
    )
    .eq('user_id', userId);

  // TODO: better error handling and proper responses
  res.status(200).json(favorites || []);
}
