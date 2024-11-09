import clsx from 'clsx';
import React from 'react';

interface Props {
  headingCopy: string;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'AccentLastTwo' | 'AccentFirstAndLast' | 'AccentLastThree';
  className?: string;
}

export function BrandAccentedHeadings(props: Props) {
  const { headingCopy, headingLevel, variant, className } = props;
  const headingParts = headingCopy.split(' ') || [];

  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  switch (variant) {
    case 'AccentLastTwo':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className
          )
        },
        <>
          {headingParts?.slice(0, headingParts.length - 2).join(' ')}{' '}
          <span className="branded-gold-serif">{headingParts?.at(-2)} </span>
          <span className="branded-red-script text-7xl">{headingParts?.at(-1)}</span>
        </>
      );

    case 'AccentFirstAndLast':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className
          )
        },
        <>
          <span className="branded-gold-serif">{headingParts?.at(0)} </span>
          {headingParts.slice(1, -1).join(' ')}
          <span className="branded-red-script text-7xl">{headingParts?.at(-1)}</span>
        </>
      );

    case 'AccentLastThree':
      return React.createElement(
        HeadingTag,
        {
          className: clsx(
            `text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className
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
            `text-center font-decorative-serif text-5xl font-semibold uppercase`,
            className
          )
        },
        headingCopy
      );
  }
}
