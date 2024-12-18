import logo from 'assets/images/TT_logo.png';
import FooterMenu from 'components/layout/footer-menu';
import { getFooterLegalDocs, getMenu } from 'lib/wix';
import Image from 'next/image';
import Link from 'next/link';
import iconData from 'of-icon-data.json';
import { Suspense } from 'react';
import { SocialIcon, networkFor, register } from 'react-social-icons';

const { COMPANY_NAME, SITE_NAME } = process.env;
const socialLinks = [
  'https://www.instagram.com/totalteaseexperience_',
  'https://www.tiktok.com/@totalteaseexperience',
  'https://x.com/totalteasexxx',
  'https://onlyfans.com/totalteasexxx'
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const legalDocs = await getFooterLegalDocs();
  const copyrightName = COMPANY_NAME || SITE_NAME || '';
  socialLinks.map((network) => {
    const networkHost = new URL(network).hostname.split('.')[0];
    if (networkHost === 'onlyfans' && networkFor(network) !== networkHost) {
      register(networkHost, iconData[networkHost]);
    }
  });

  return (
    <footer className="relative z-50 bg-neutral-200 text-sm text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-neutral-200 px-6 py-3 text-sm md:gap-6 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <Image src={logo} alt="Total Tease logo" height={50} />
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
                  className="text-black hover:text-black hover:text-theme-primary dark:text-theme-secondary dark:hover:text-theme-primary"
                />
              ))}
            </div>
            <div className="flex divide-x divide-neutral-500">
              {legalDocs.map((doc) => (
                <a target="_blank" className="px-2 hover:text-theme-primary" href={doc.url || ''}>
                  {doc.displayName}
                </a>
              ))}
            </div>
          </div>
        </Suspense>
      </div>
      <div className="border-t border-neutral-200 bg-gradient-theme-primary py-6 text-sm dark:border-neutral-700">
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
