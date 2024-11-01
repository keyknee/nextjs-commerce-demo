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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-neutral-200 px-6 py-3 text-sm md:gap-6 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <Image src={logo} alt="Total Tease logo" height={50} />
            <span className="uppercase">
              The{' '}
              <span className="text-theme-secondary font-decorative-serif text-lg font-semibold">
                {'Total '}
              </span>
              <span className="text-theme-primary font-decorative-script relative -bottom-1 -left-2 -mr-1.5 text-lg capitalize">
                {'Tease '}
              </span>{' '}
              Experience
            </span>
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
          <div className="flex w-full flex-wrap items-center justify-between">
            <FooterMenu menu={menu} />
            <div>
              {socialLinks.map((link, i) => (
                <SocialIcon
                  bgColor="transparent"
                  fgColor="currentColor"
                  url={link}
                  key={i}
                  className="dark:text-theme-secondary hover:text-theme-primary dark:hover:text-theme-primary text-black hover:text-black"
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>
      <div className="bg-gradient-theme-primary border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 text-white md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
