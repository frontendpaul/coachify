import { isSidenavExpandedAtom } from '@components/Header';
import Button from '@components/ui/Button';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import Image from 'next/image';
import rocketImage from '../../../public/rocket.png';

const Promo = () => {
  const [isSidenavExpanded] = useAtom(isSidenavExpandedAtom);
  return (
    <section className="px-4 md:px-6 w-full max-w-7xl mx-auto">
      <div
        className="relative px-4 pb-6 text-coachify-teal-1300 bg-gradient-to-tr from-sky-200 to-emerald-200 rounded-xl
        md:p-8 lg:p-10 xl:p-16"
      >
        <Image
          src={rocketImage}
          alt=""
          quality={100}
          className={clsx(
            'w-[min(80%,320px)] mx-auto -translate-y-8',
            'md:absolute md:bottom-0 md:left-[52vw] md:translate-y-0 md:w-auto md:h-[120%]',
            'lg:left-[53%] xl:h-[150%] xl:bottom-[-30%] xl:[clip-path:polygon(0_0,100%_0,100%_80%,0_80%)]',
            isSidenavExpanded && 'md:hidden lg:block'
          )}
        />
        <div className="grid gap-6 2xl:gap-12 w-[min(100%,330px)] mx-auto md:w-auto md:mx-0">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
            Are you a creator?
            <br /> Reach new heights with us!
          </h2>
          <p className="lg:text-lg">
            Just sign up for free and upload your courses today.
            <br />
            <strong>Sell, teach & rank up with other creators.</strong>
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-2">
            <Button intent="secondary">Start earning now</Button>
            <LinkWithChevron
              href="/become-a-creator"
              text="More about Creators Program"
              className="text-base font-semibold"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Promo;
