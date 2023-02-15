import { isLoginDialogOpenAtom } from '@components/Layout/Header/AuthDialog/Login';
import Button from '@components/ui/Button';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useFavoriteProducts from 'hooks/useFavoriteProducts';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { mutate } from 'swr';
import { isProductInUserFavorites } from 'utils/helpers';

type Props = {
  id: string;
  className?: string;
  disabled?: boolean;
};

const FavoriteProductButton = ({ id, className, disabled }: Props) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { favorites } = useFavoriteProducts();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [_, setIsLoginDialogOpen] = useAtom(isLoginDialogOpenAtom);

  useEffect(() => {
    setIsFavorite(isProductInUserFavorites(favorites, id));
  }, [favorites, id, setIsFavorite, isFavorite]);

  const handleFavorite = () => {
    if (!user) {
      setIsLoginDialogOpen(true);
      return;
    }

    if (!isFavorite) {
      createFavorite(user.id, id);
    } else {
      deleteFavorite(user.id, id);
    }
  };

  const createFavorite = async (userId: string, productId: string) => {
    setIsFavoriteLoading(true);

    const { error } = await supabase.from('favorite_product').insert({
      user_id: userId,
      product_id: productId,
    });

    if (error) console.log(error);
    mutate('/api/users/products/favorites');
    setIsFavoriteLoading(false);
  };

  const deleteFavorite = async (userId: string, productId: string) => {
    setIsFavoriteLoading(true);

    const { error } = await supabase
      .from('favorite_product')
      .delete()
      .match({ user_id: userId, product_id: productId });

    if (error) console.log(error);
    mutate('/api/users/products/favorites');
    setIsFavoriteLoading(false);
  };

  return (
    <Button
      fill="outline"
      icon="icon-left"
      className={className}
      disabled={disabled || isFavoriteLoading}
      onClick={() => handleFavorite()}
    >
      <FiHeart style={{ fill: isFavorite ? 'currentcolor' : 'none' }} />
      <span>
        {isFavorite ? (
          'Saved'
        ) : (
          <span>
            Save <span className="hidden sm:inline">for later</span>
          </span>
        )}
      </span>
    </Button>
  );
};
export default FavoriteProductButton;
