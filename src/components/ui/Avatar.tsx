import Image from 'next/image';
import { User } from 'types/supabase';

// Must be placed inside a cointainer with a given width
const Avatar = ({ user }: { user: User }) => {
  if (!user?.avatar_url) {
    const initial = user?.name[0];
    return (
      <div className="grid aspect-square place-items-center rounded-full bg-lime-200 font-extrabold text-coachify-teal-1300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <text
            transform="matrix(1 0 0 1 51 72) scale(1, 1)"
            fontSize="60px"
            fontWeight={700}
            textAnchor="middle"
          >
            {initial}
          </text>
        </svg>
      </div>
    );
  }
  return (
    <div className="relative aspect-square overflow-hidden rounded-full">
      <Image src={user?.avatar_url} fill sizes="100px" alt="" />
    </div>
  );
};
export default Avatar;
