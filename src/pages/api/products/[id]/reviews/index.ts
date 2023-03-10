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

  const { id, page, size, ascending } = req.query;
  const { from, to } = getPagination(
    parseInt(page as string),
    parseInt(size as string)
  );
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  const query = supabaseServerClient
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
    `
    )
    .eq('product_id', id);

  if (user) query.neq('user.id', user.id);
  if (page || size) query.range(from, to);
  if (!ascending || ascending === 'false')
    query.order('updated_at', { ascending: false });
  if (ascending) query.order('updated_at', { ascending: true });

  const { data: reviews, error } = await query;

  // TODO: better error handling and proper responses
  res.status(200).json(reviews);
}
