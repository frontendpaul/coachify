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

  const { id } = req.query;

  const { data: reviews, error } = await supabaseServerClient
    .from('review')
    .select(
      `
      id,
      product_id,
      owner:user(
        id,
        name,
        avatar_url
      ),
      body,
      rating,
      created_at,
      updated_at
    `
    )
    .eq('product_id', id);

  // TODO: better error handling and proper responses
  res.status(200).json(reviews);
}
