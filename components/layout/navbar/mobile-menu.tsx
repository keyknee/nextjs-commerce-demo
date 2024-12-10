'use client';

import { Dialog, Transition } from '@headlessui/react';
import { LoginMobile } from 'components/auth/LoginBar';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/wix/types';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  function toggleSubMenu(e: React.MouseEvent<HTMLLIElement>) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.classList.toggle('open');
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors min-[900px]:hidden dark:border-neutral-700 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu, i: number) => (
                      <li
                        onClick={toggleSubMenu}
                        className="group font-small-caps relative py-2 font-decorative-serif text-lg font-semibold text-black underline-offset-8 transition-colors hover:text-black hover:text-theme-primary dark:text-theme-secondary dark:hover:text-theme-primary"
                        key={`${i}_${item.title}`}
                      >
                        {item.subPages?.length ? (
                          <>
                            <span>{item.title}</span>
                            <div className="grid grid-rows-[0fr] transition-all group-[.open]:grid-rows-1">
                              <div className="overflow-hidden">
                                <div className="flex flex-col">
                                  {item.subPages.map((subPage, i: number) => (
                                    <Link
                                      key={`${i}_${subPage.id}`}
                                      className={`pl-4 text-black no-underline hover:text-theme-primary dark:text-theme-secondary`}
                                      href={`${item.path}/${subPage.handle}`}
                                    >
                                      {subPage.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                            {item.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mb-4 w-full">
                  {/* <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense> */}
                  <LoginMobile />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
