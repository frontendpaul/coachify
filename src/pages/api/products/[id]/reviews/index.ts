import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getPagination } from 'utils/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const { id, page = '1', size = '10' } = req.query;
  const { from, to } = getPagination(
    parseInt(page as string),
    parseInt(size as string)
  );

  const {
    data: reviews,
    count,
    error,
  } = await supabaseServerClient
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
    `,
      { count: 'exact' }
    )
    .eq('product_id', id)
    .order('created_at', { ascending: false })
    .range(from, to);

  // TODO: better error handling and proper responses
  res.status(200).json(reviews);
}
