import Link from 'next/link';

const Footer = () => {
  return (
    <p className="text-xs text-white/50">
      By continuing, you agree to our{' '}
      <Link href="/terms-of-use" className="underline hover:text-white">
        Terms of Use
      </Link>{' '}
      and{' '}
      <Link href="/privacy-policy" className="underline hover:text-white">
        Privacy Policy
      </Link>
      .
    </p>
  );
};
export default Footer;
