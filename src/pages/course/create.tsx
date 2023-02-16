import Button from '@components/ui/Button';
import InputWithLabel from '@components/ui/Inputs/InputWithLabel';
import SectionTitle from '@components/ui/SectionTitle';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

type Product = {
  user_id: string; // owner id
  free: boolean;
  state: 'published' | 'unlisted' | 'draft';
  price?: number;
  old_price?: number;
  rank_score?: number; // defaults to 0
  category?: string; // id
  metadata?: string; // id
  content?: string; // id
};

const Create = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  // const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [state, setState] = useState<'published' | 'unlisted' | 'draft'>(
    'draft'
  );

  const createProduct = async () => {
    const product = {
      user_id: user?.id,
      free: isFree,
      state: state,
    };

    const { data: product_data, error: product_error } = await supabase
      .from('product')
      .insert(product)
      .select();

    if (product_error) {
      console.log(product_error);
      return;
    }

    if (!product_data) return;

    const product_id = product_data[0]?.id;

    const { data: metadata_data, error: metadata_error } = await supabase
      .from('product_metadata')
      .insert({
        id: product_id,
        title: 'Title',
        description: 'desc',
        short_description: 'short',
        cover_img: '/courses/filmmaking.jpg',
        rating: 0,
        participants: 0,
        language: 'German',
        level: 'expert',
      });

    if (metadata_error) {
      console.log(metadata_error);
      return;
    }

    alert('product added');
  };

  if (!user) {
    return <p>not logged in</p>;
  }

  if (user.user_metadata.role != 'creator') {
    return <p>You are not a creator</p>;
  }

  return (
    <section className="max-w-md">
      <SectionTitle>Create new course</SectionTitle>

      <div className="grid gap-6">
        <p>owner_id: {user.id}</p>

        <div className="grid gap-2">
          <label htmlFor="free">Is it free?</label>
          <input
            type="checkbox"
            name="free"
            id="free"
            onChange={() => setIsFree(!isFree)}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="state">Is it free?</label>
          <select
            className="text-black"
            name="state"
            id="free"
            onChange={(e) =>
              setState(
                e.currentTarget.value as 'published' | 'unlisted' | 'draft'
              )
            }
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="unlisted">unlisted</option>
          </select>
        </div>

        <Button onClick={() => createProduct()}>Create product</Button>
      </div>
    </section>
  );
};
export default Create;
