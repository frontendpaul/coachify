import Link from 'next/link';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import React from 'react';
import LanguageSelect from '@ui/LanguageSelect';

type FooterLink = {
  text: string;
  href: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode; // React Icon OR SVG
};

const leftColumnLinks: FooterLink[] = [
  { text: 'Become a teacher', href: '/' },
  { text: 'Ranking system', href: '/' },
  { text: 'About us', href: '/' },
  { text: 'Contact', href: '/' },
];

const rightColumnLinks: FooterLink[] = [
  { text: 'Terms and conditions', href: '/' },
  { text: 'Privacy policy', href: '/' },
  { text: 'Cookies settings', href: '/' },
];

const socialLinks: SocialLink[] = [
  { name: 'twitter', href: 'https://twitter.com', icon: <BsTwitter /> },
  { name: 'instagram', href: 'https://instagram.com', icon: <BsInstagram /> },
];

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="pt-16 md:pt-32 pb-4 md:mb-6 px-4 md:px-6">
      <div className="lg:grid lg:grid-flow-col">
        <div className="mb-6 lg:mb-0 lg:order-2 lg:ml-auto">
          <LanguageSelect footer />
        </div>

        <div className="md:grid md:grid-cols-2 md:max-w-md">
          <ul className="flex flex-col gap-1 mb-1 md:mb-0">
            {leftColumnLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="text-sm">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-1">
            {rightColumnLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="text-sm">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="flex gap-6 mt-6 lg:mt-8 text-xl">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.icon}</Link>
          </li>
        ))}
      </ul>
      <p className="text-xs text-white text-opacity-75 mt-6 lg:mt-8">
        © {year} Coachify GmbH
      </p>
    </footer>
  );
};
export default Footer;
