'use client';
import clsx, { ClassValue } from 'clsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import React, { useRef } from 'react';

export function OnScrollListItem({
  children,
  className
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <li
      ref={ref}
      className={clsx(
        'scroll-animate',
        className,
        { 'translate-y-0 opacity-100': isVisible },
        { 'translate-y-10 opacity-0': !isVisible }
      )}
    >
      {children}
    </li>
  );
}
