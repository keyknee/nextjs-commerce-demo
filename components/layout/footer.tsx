import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/wix';
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
      <div className="mx-[2em] flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:mx-[calc(5vw)] md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div className="flex w-full flex-col">
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <div className="flex w-full justify-between">
            <FooterMenu menu={menu} />
            <div className="w-full">
              {socialLinks.map((link) => (
                <SocialIcon
                  url={link}
                  bgColor="transparent"
                  fgColor="currentColor"
                  className="text-theme-primary hover:text-theme-secondary mx-px"
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>
      <div className="bg-gradient-theme-primary border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
        </div>
      </div>
    </footer>
  );
}
