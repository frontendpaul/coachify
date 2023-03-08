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
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  const userId = user?.id ?? undefined;

  // if (!userId) {
  //   res.status(500).json({ message: 'user not found' });
  //   return;
  // }

  const { data: progress, error } = await supabaseServerClient
    .from('progress')
    .select(
      `
    user_id,
    product_id,
    playlist,
    current_chapter,
    timestamp
    `
    )
    .match({ user_id: userId, product_id: id })
    .single();

  // TODO: better error handling and proper responses
  res.status(200).json(progress || []);
}
