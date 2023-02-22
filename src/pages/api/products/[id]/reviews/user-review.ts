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

  const { id, user: userId } = req.query;

  // TODO: instead of limit to one, ensure that user can create only one review per product
  const { data: review, error } = await supabaseServerClient
    .from('review')
    .select(
      `
      id,
      product_id,
      owner:user!inner(
        id,
        name,
        avatar_url
      ),
      body,
      rating,
      created_at,
      updated_at
    `,
      { count: 'exact' }
    )
    .match({ product_id: id, 'user.id': userId })
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) console.log(error);

  // TODO: better error handling and proper responses
  res.status(200).json(review || []);
}
