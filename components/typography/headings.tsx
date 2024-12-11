'use client';
import clsx from 'clsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import React, { useRef } from 'react';

interface AccentProps {
  headingCopy: string;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'AccentLastTwo' | 'AccentFirstAndLast' | 'AccentLastThree' | 'AccentFirstTwo';
  className?: string;
  animate?: boolean;
  animateEntryDirection?: 'left' | 'right' | 'bottom';
}

interface BookingProps extends Pick<AccentProps, 'headingLevel' | 'className'> {
  serviceName: string;
}

export function BrandAccentedHeadings(props: AccentProps) {
  const { headingCopy, headingLevel, variant, className, animate, animateEntryDirection } = props;
  const headingParts = headingCopy.split(' ') || [];
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  switch (variant) {
    case 'AccentLastTwo':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `${animate ? `scroll-animate` : null} text-shadow-sm text-center font-decorative-serif text-4xl md:text-5xl font-semibold uppercase`,
            className,
            { 'opacity-100 translate-0': isVisible && animate },
            { 'opacity-0': !isVisible && animate },
            { '-translate-x-10': !isVisible && animate && animateEntryDirection === 'left' },
            { 'translate-x-10': !isVisible && animate && animateEntryDirection === 'right' },
            {
              '-translate-y-20':
                !isVisible &&
                animate &&
                (animateEntryDirection === 'bottom' || !animateEntryDirection)
            }
          ),
          ref: ref
        },
        <>
          {headingParts?.slice(0, headingParts.length - 2).join(' ')}{' '}
          <span className="branded-gold-serif">{headingParts?.at(-2)} </span>
          <span className="branded-red-script text-6xl md:text-7xl">{headingParts?.at(-1)}</span>
        </>
      );

    case 'AccentFirstAndLast':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `${animate ? `scroll-animate` : null} text-shadow-sm text-center font-decorative-serif text-3xl lg:text-5xl font-semibold uppercase`,
            className,
            { 'opacity-100 translate-0': isVisible && animate },
            { 'opacity-0': !isVisible && animate },
            { '-translate-x-10': !isVisible && animate && animateEntryDirection === 'left' },
            { 'translate-x-10': !isVisible && animate && animateEntryDirection === 'right' },
            {
              'translate-y-20':
                !isVisible &&
                animate &&
                (animateEntryDirection === 'bottom' || !animateEntryDirection)
            }
          ),
          ref: ref
        },
        <>
          <span className="branded-gold-serif">{headingParts?.at(0)} </span>
          {headingParts.slice(1, -1).join(' ')}
          <span className="branded-red-script text-5xl lg:text-7xl">{headingParts?.at(-1)}</span>
        </>
      );

    case 'AccentFirstTwo':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `${animate ? `scroll-animate` : null} text-shadow-sm text-center font-decorative-serif text-3xl md:text-5xl font-semibold uppercase max-w-full`,
            className,
            { 'opacity-100 translate-0': isVisible && animate },
            { 'opacity-0': !isVisible && animate },
            { '-translate-x-10': !isVisible && animate && animateEntryDirection === 'left' },
            { 'translate-x-10': !isVisible && animate && animateEntryDirection === 'right' },
            {
              '-translate-y-20':
                !isVisible &&
                animate &&
                (animateEntryDirection === 'bottom' || !animateEntryDirection)
            }
          ),
          ref: ref
        },
        <>
          <span className="branded-gold-serif">{headingParts?.at(0)} </span>
          <span className="branded-red-script text-7xl">{headingParts?.at(1)}</span>
          {headingParts.slice(2).join(' ')}
        </>
      );

    case 'AccentLastThree':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `${animate ? `scroll-animate` : null} text-shadow-sm text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className,
            { 'opacity-100 translate-y-0': isVisible && animate },
            { 'opacity-0 -translate-y-20': !isVisible && animate }
          )
        },
        <>
          {headingParts?.slice(0, headingParts.length - 3).join(' ')}{' '}
          <span className="branded-gold-serif">{headingParts?.at(-3)} </span>
          {headingParts?.at(-2)}{' '}
          <span className="branded-red-script text-7xl">{headingParts?.at(-1)}</span>
        </>
      );
    default:
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `text-shadow-sm text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className
          )
        },
        headingCopy
      );
  }
}

export function WhyBookHeading(props: BookingProps) {
  const { headingLevel, className, serviceName } = props;
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    HeadingTag,
    {
      className: clsx(
        `scroll-animate text-shadow-sm text-center font-decorative-serif max-sm:text-3xl text-4xl font-semibold uppercase`,
        className,
        { 'opacity-100 translate-x-0': isVisible },
        { 'opacity-0 -translate-x-10': !isVisible }
      ),
      ref: ref
    },
    <>
      Why should I book a <span className="branded-gold-serif">{serviceName}</span>
      <span className="branded-red-script text-7xl max-sm:text-6xl">Session?</span>
    </>
  );
}

export function WhatGoesDownHeading(props: BookingProps) {
  const { headingLevel, className, serviceName } = props;
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    HeadingTag,
    {
      className: clsx(
        `scroll-animate text-shadow-sm text-center font-decorative-serif max-sm:text-3xl text-4xl font-semibold uppercase`,
        className,
        { 'opacity-100 translate-x-0': isVisible },
        { 'opacity-0 translate-x-10': !isVisible }
      ),
      ref: ref
    },
    <>
      What goes down in a <span className="branded-gold-serif">{serviceName}</span>
      <span className="branded-red-script text-7xl max-sm:text-6xl">Session?</span>
    </>
  );
}
