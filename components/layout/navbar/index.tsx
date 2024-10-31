import logo from 'assets/images/total-tease-logo.png';
import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/wix';
import { Menu } from 'lib/wix/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-neutral-50/70 p-4 backdrop-blur-sm lg:px-6 dark:bg-neutral-900/70">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex flex-wrap">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Image src={logo} alt="Total Tease logo" height={50} />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="font-decorative-serif font-small-caps text-theme-primary dark:hover:text-theme-secondary text-lg font-semibold underline-offset-8 hover:text-black hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <CartModal />
        </div>
      </div>
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
    </nav>
  );
}
