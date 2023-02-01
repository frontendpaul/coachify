import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { User } from 'server/courses';

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
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="mb-3 text-2xl font-semibold xl:text-3xl">{title}</h1>
        <p className="text-coachify-gray-300 xl:text-lg">{short_description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10">
          <Avatar user={owner} />
        </div>
        <p className="leading-none">{owner.name}</p>
      </div>
      <p className="text-2xl font-semibold">
        {price ? price.toString().replace(/\./g, ',') + ' €' : 'Free'}
        {old_price && (
          <s className="ml-4 text-base text-white/75 line-through">
            {old_price.toString().replace(/\./g, ',') + ' €'}
          </s>
        )}
      </p>
      <div className="grid w-full grid-cols-2 justify-items-start gap-4 sm:flex">
        <Button href={id + '/learn'} className="w-full sm:w-44">
          {free ? 'Enroll now' : 'Buy now'}
        </Button>
        <Button fill="outline" icon="icon-left" className="w-full sm:w-auto">
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
