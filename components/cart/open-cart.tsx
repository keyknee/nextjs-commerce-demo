import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="dark:border-theme-primary relative flex h-11 w-11 items-center justify-center rounded-md border border-slate-800 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon
        className={clsx(
          'dark:text-theme-primary dark:group-hover:text-theme-secondary group-hover:text-theme-primary group-focus:text-theme-primary dark:group-focus:text-theme-secondary h-4 text-slate-800 transition-all ease-in-out group-hover:scale-110',
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
