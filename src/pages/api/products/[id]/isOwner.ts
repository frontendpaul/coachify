import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Product } from 'types/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const { id } = req.query;
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(200).json({ isOwner: false });
    return;
  }

  const { data: product, error } = await supabaseServerClient
    .from('product')
    .select(
      `
      id,
      owner:user(
        id
      )`
    )
    .eq('id', id)
    .single();

  if (!product) {
    res.status(200).json({ isOwner: false });
    return;
  }

  const owner = Array.isArray(product.owner) ? product.owner[0] : product.owner;

  if (owner?.id === user.id) {
    res.status(200).json({ isOwner: true });
    return;
  }

  // TODO: better error handling and proper responses
  res.status(200).json({ isOwner: false });
}
