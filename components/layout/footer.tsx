import logo from 'assets/images/total-tease-logo.png';
import FooterMenu from 'components/layout/footer-menu';
import { getMenu } from 'lib/wix';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { SocialIcon } from 'react-social-icons';

const { COMPANY_NAME, SITE_NAME } = process.env;
const socialLinks = [
  'https://www.instagram.com/_totaltease/',
  'https://www.tiktok.com/@totalteaseexperie'
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <Image src={logo} alt="Total Tease logo" height={50} />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <div className="flex w-full items-center justify-between">
            <FooterMenu menu={menu} />
            <div>
              {socialLinks.map((link) => (
                <SocialIcon
                  bgColor="transparent"
                  fgColor="currentColor"
                  url={link}
                  className="text-theme-primary hover:text-theme-secondary"
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>
      <div className="bg-gradient-theme-primary border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="text-white-800 mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
