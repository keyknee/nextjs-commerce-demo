import { WhatGoesDownHeading, WhyBookHeading } from 'components/typography';
import type { Image as ImageType, Video } from 'lib/wix/types';
import Image from 'next/image';
import { ReactNode } from 'react';
import { ServicesReasons } from './partitioning';

interface Props {
  serviceTitle: string;
  copy: string;
  image?: ImageType;
  video?: Video;
}

function StackedWrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-screen-xl flex-col gap-8 xl:flex-row">{children}</div>;
}

export async function ReasonsToBook(props: Props) {
  const { serviceTitle, copy, image } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        <WhyBookHeading headingLevel={2} serviceName={serviceTitle} className="relative z-10" />
        {image && image.width ? (
          <div
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
            className="relative mx-auto max-h-[768px] max-w-screen-sm"
          >
            <Image src={image.url} fill={true} alt={image.altText} />
            <div className="absolute left-0 top-0 z-[2] h-full w-full bg-radial-light dark:bg-radial-dark" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full">
        <ServicesReasons
          proseHTML={copy}
          className={`grid items-center gap-x-2 gap-y-12 prose-h3:text-3xl prose-h3:text-theme-secondary prose-p:text-neutral-900 prose-li:h-full prose-li:max-w-sm max-sm:prose-h3:text-2xl max-sm:prose-li:w-fit sm:grid-cols-2 dark:prose-p:text-neutral-100`}
        />
      </div>
    </StackedWrapper>
  );
}

export async function WhatGoesDown(props: Props) {
  const { serviceTitle, copy, image, video } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        {image && image.width ? (
          <div
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
            className="relative mx-auto max-h-[768px] max-w-screen-sm"
          >
            <Image src={image.url} fill={true} alt={image.altText} />
            <div className="absolute left-0 top-0 z-[2] h-full w-full bg-radial-light dark:bg-radial-dark" />
          </div>
        ) : (
          <div className="relative mx-auto max-h-[768px] max-w-screen-sm overflow-hidden">
            <video autoPlay muted loop poster={video?.thumbnail} playsInline>
              <source src={video?.url} type={'video/webm'} />
            </video>
          </div>
        )}
        <WhatGoesDownHeading
          headingLevel={2}
          serviceName={serviceTitle}
          className="relative z-10"
        />
      </div>
      <div className="w-full">
        <ServicesReasons
          proseHTML={copy}
          className={`grid items-center gap-x-2 gap-y-12 prose-h3:text-3xl prose-h3:text-theme-secondary prose-p:text-neutral-900 prose-li:h-full prose-li:max-w-sm max-sm:prose-h3:text-2xl max-sm:prose-li:w-fit sm:grid-cols-2 dark:prose-p:text-neutral-100`}
        />
      </div>
    </StackedWrapper>
  );
}
