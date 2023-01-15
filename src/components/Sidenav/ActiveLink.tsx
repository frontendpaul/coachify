import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';

type ActiveLinkProps = LinkProps & {
  text: string;
  icon?: React.ReactNode;
};
const ActiveLink = ({
  text,
  icon,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [isActive, SetIsActive] = useState(false);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      SetIsActive(linkPathname === activePathname);
    }
  }, [asPath, isReady, props.as, props.href]);

  return (
    <Link
      className="flex items-center gap-6 rounded-lg transition-200-out-quart hover:bg-white/5"
      {...props}
    >
      <div
        className={clsx(
          'p-[10px] text-xl rounded-lg',
          isActive && 'bg-coachify-cyan-700 text-coachify-teal-1000'
        )}
      >
        {icon}
      </div>
      {text}
    </Link>
  );
};

export default ActiveLink;
