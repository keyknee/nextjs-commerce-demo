'use client';

import clsx from 'clsx';
import { Menu } from 'lib/wix/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'font-decorative-serif font-small-caps hover:text-theme-primary dark:hover:text-theme-primary dark:text-theme-secondary block px-2 text-sm text-black underline-offset-8 hover:text-black hover:underline md:inline-block md:text-lg',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul className="dark:divide-theme-secondary/50 flex gap-2 divide-x-2 divide-slate-300">
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
