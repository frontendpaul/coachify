import { userContractsAtom } from '@components/Layout';
import { isAuthDialogOpenAtom } from '@components/Layout/Header';
import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiHeart, FiInfo, FiShare2 } from 'react-icons/fi';
import { User } from 'server/courses';
import { isCourseOwnedByUser } from 'utils/helpers';

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
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useAtom(isAuthDialogOpenAtom);
  const user = useUser();

  const [isOwner, setIsOwner] = useState<boolean>(true);

  useEffect(() => {
    setIsOwner(user?.id === owner.id);
  }, [user, owner]);

  const handelBuy = (e: any) => {
    if (!user) {
      e.preventDefault();
      setIsAuthDialogOpen(true);
      return;
    }
    if (!isOwned) {
      createContract(user.id, owner.id, id);
    }
  };

  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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
    getUserContracts(buyerId);
  };

  const getUserContracts = async (userId: string) => {
    try {
      let { data: contracts, error } = await supabase
        .from('contract')
        .select(
          `
        id,
        buyer_id,
        seller_id,
        product_id,
        created_at,
        updated_at
        `
        )
        .eq('buyer_id', userId);

      contracts && setUserContracts(contracts);
    } catch (error) {
      console.log(error);
    }
  };

  const [userContracts, setUserContracts] = useAtom(userContractsAtom);
  const [isOwned, setIsOwned] = useState<boolean>(false);

  useEffect(() => {
    setIsOwned(isCourseOwnedByUser(userContracts, id));
  }, [userContracts, id, setIsOwned]);

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
            onClick={(e) => handelBuy(e)}
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
        <Button
          fill="outline"
          icon="icon-left"
          className="w-full sm:w-auto md:w-full md:px-0"
          disabled={isOwner}
        >
          <FiHeart />
          <span>
            Save <span className="hidden sm:inline">for later</span>
          </span>
        </Button>
        <Button fill="outline" icon="icon-only">
          <FiShare2 />
          <span className="sr-only">Share</span>
        </Button>
      </div>
    </div>
  );
};
export default Overview;
