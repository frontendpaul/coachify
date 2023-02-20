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

  const defaultData = {
    number_of_reviews: 0,
    ratings: [0, 0, 0, 0, 0],
  };

  const { id } = req.query;

  const { data, error } = await supabaseServerClient
    .from('reviews_metadata')
    .select('*')
    .eq('product_id', id)
    .single();

  // TODO: better error handling and proper responses
  !data && res.status(200).json(defaultData);
  data && res.status(200).json(data);
}
