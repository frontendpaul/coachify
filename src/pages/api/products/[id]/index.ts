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

  const { data: product, error } = await supabaseServerClient
    .from('product')
    .select(
      `
    id,
    owner:user(
      id,
      name,
      avatar_url,
      description
    ),
    state,
    free,
    price,
    old_price,
    category(name),
    metadata:product_metadata(*),
    content:product_content(
      sections:section(
        *,
        chapters:chapter(
          *,
          video:video(*),
          resources:resource(*)
        )
      )
    ),
    reviews:review(
      id,
      owner:user(
        name,
        avatar_url
      ),
      body,
      rating,
      created_at,
      updated_at
    ),
    created_at,
    updated_at
  `
    )
    .eq('id', id)
    .single();

  // TODO: better error handling and proper responses
  res.status(200).json(product);
}
