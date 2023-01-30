import Image from 'next/image';
import { User } from 'server/courses';

// Must be placed inside a cointainer with a given width
const Avatar = ({ user }: { user: User }) => {
  if (!user.avatar) {
    const initial = user.name[0];
    return (
      <div className="grid place-items-center aspect-square rounded-full bg-lime-200 text-coachify-teal-1300 font-extrabold">
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
    <div className="relative overflow-hidden rounded-full aspect-square">
      <Image src={user.avatar} fill alt="" />
    </div>
  );
};
export default Avatar;
