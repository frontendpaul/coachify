import FavoriteProductButton from '@components/common/FavoriteProductButton';
import { isLoginDialogOpenAtom } from '@components/Layout/Header/AuthDialog/Login';
import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useUserContracts from 'hooks/useUserContracts';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiInfo } from 'react-icons/fi';
import { User } from 'server/courses';
import { mutate } from 'swr';
import { isCourseOwnedByUser } from 'utils/helpers';
import Share from './Share';

type Props = {
  id: string;
  title: string;
  short_description: string;
  owner: User;
  free: boolean;
  price?: number;
  old_price?: number;
};

const Overview = ({
  id,
  title,
  short_description,
  owner,
  free,
  price,
  old_price,
}: Props) => {
  const [_, setIsLoginDialogOpen] = useAtom(isLoginDialogOpenAtom);
  const user = useUser();

  const [isOwner, setIsOwner] = useState<boolean>(true);

  useEffect(() => {
    setIsOwner(user?.id === owner.id);
  }, [user, owner]);

  const handelBuy = (e: any) => {
    if (!user) {
      e.preventDefault();
      setIsLoginDialogOpen(true);
      return;
    }
    if (!isOwned) {
      createContract(user.id, owner.id, id);
    }
  };

  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createContract = async (
    buyerId: string,
    sellerId: string,
    productId: string
  ) => {
    setIsLoading(true);

    const { error } = await supabase.from('contract').insert({
      buyer_id: buyerId,
      seller_id: sellerId,
      product_id: productId,
    });

    if (error) console.log(error);
    setIsLoading(false);
    mutate('/api/users/contracts');
  };
  const { contracts } = useUserContracts();
  const [isOwned, setIsOwned] = useState<boolean>(false);

  useEffect(() => {
    setIsOwned(isCourseOwnedByUser(contracts, id));
  }, [contracts, id, setIsOwned]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="mb-3 text-2xl font-semibold xl:text-3xl">
          {title ? title : '-'}
        </h1>
        <p className="text-coachify-gray-300 xl:text-lg">
          {short_description ? short_description : '-'}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10">
          <Avatar user={owner} />
        </div>
        <p className="leading-none">{owner.name}</p>
      </div>
      <p className="text-2xl font-semibold">
        {isOwned ? (
          <span className="flex items-center gap-3">
            <FiInfo />
            <span className="text-lg">You already own this course</span>
          </span>
        ) : (
          <>
            {free && 'Free'}
            {price && price.toString().replace(/\./g, ',') + ' €'}
            {old_price && (
              <s className="ml-4 text-base text-white/75 line-through">
                {old_price.toString().replace(/\./g, ',') + ' €'}
              </s>
            )}
          </>
        )}
      </p>
      <div className="grid w-full grid-cols-2 justify-items-start gap-4 sm:flex md:grid md:grid-cols-4">
        {/* Owner can't buy his own product -> disabled */}
        {isOwned ? (
          <Button href={id + '/learn'} className="w-full sm:w-44 md:w-full">
            Go to course
          </Button>
        ) : (
          <Button
            className="w-full sm:w-44 md:w-full"
            onClick={(e: React.MouseEvent) => handelBuy(e)}
            disabled={isOwner || isLoading}
          >
            {isLoading ? (
              <BiLoaderAlt className="-m-1 h-6 w-6 animate-spin" />
            ) : (
              <>{free ? 'Enroll now' : 'Buy now'}</>
            )}
          </Button>
        )}
        {/* Owner can't like his own product -> disabled */}
        <FavoriteProductButton
          id={id}
          className="w-full sm:w-auto md:w-full md:px-0"
          disabled={isOwner}
        />
        <Share />
      </div>
    </div>
  );
};
export default Overview;
