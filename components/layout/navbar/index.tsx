import logo from 'assets/images/TT_logo.png';
import { LoginBar } from 'components/auth/LoginBar';
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
    <nav className="bg-nav fixed top-0 z-50 flex w-full items-center justify-between px-4 shadow-sm lg:px-5">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center py-6 min-[900px]:w-auto lg:mr-5"
          >
            <Image src={logo} alt="Total Tease logo" height={50} />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm min-[900px]:flex min-[900px]:items-center">
              {menu.map((item: Menu, i: number) => (
                <li
                  className="group font-small-caps relative py-8 font-decorative-serif text-lg font-semibold text-black underline-offset-8 hover:text-black hover:text-theme-primary hover:underline dark:text-theme-secondary dark:hover:text-theme-primary"
                  key={`${i}_${item.title}`}
                >
                  {item.subPages?.length ? (
                    <>
                      <span>{item.title}</span>
                      <div
                        className={`bg-nav absolute top-[90px] hidden w-[200px] flex-col gap-y-4 rounded-md p-4 group-hover:flex`}
                      >
                        {item.subPages.map((subPage, i: number) => (
                          <Link
                            key={`${i}_${subPage.id}`}
                            className="text-black hover:text-black hover:text-theme-primary hover:underline dark:text-theme-secondary dark:hover:text-theme-primary"
                            href={`${item.path}/${subPage.handle}`}
                          >
                            {subPage.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="font-small-caps font-decorative-serif text-lg font-semibold text-black underline-offset-8 hover:text-black hover:text-theme-primary hover:underline dark:text-theme-secondary dark:hover:text-theme-primary"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="hidden items-center gap-4 min-[900px]:flex">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <CartModal />
          <LoginBar />
        </div>
      </div>
      <div className="block flex-none min-[900px]:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
    </nav>
  );
}
