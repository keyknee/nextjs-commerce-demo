import { CarouselFade } from 'components/embla-carousel';
import { WhatGoesDownHeading, WhyBookHeading } from 'components/typography';
import { VideoPlayer } from 'components/video/VideoComponent';
import type { Image as ImageType, Video } from 'lib/wix/types';
import Image from 'next/image';
import { ReactNode } from 'react';
import { ServicesReasons } from './partitioning';

interface Props {
  serviceTitle: string;
  copy: string;
  images: ImageType[];
  video?: Video;
}

function StackedWrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-screen-xl flex-col gap-8 xl:flex-row">{children}</div>;
}

export async function ReasonsToBook(props: Props) {
  const { serviceTitle, copy, images } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        <WhyBookHeading headingLevel={2} serviceName={serviceTitle} className="relative z-10" />
        {images.length > 1 ? (
          <CarouselFade photos={images} slideClassName="flex-[0_0_100%]" />
        ) : images.length === 1 ? (
          <div
            style={{ aspectRatio: `${images[0]!.width} / ${images[0]!.height}` }}
            className="relative mx-auto max-h-[768px] max-w-screen-sm"
          >
            <Image src={images[0]!.url} fill={true} alt={images[0]!.altText} />
            <div className="absolute left-0 top-0 z-[2] h-full w-full bg-radial-light dark:bg-radial-dark" />
          </div>
        ) : null}
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
  const { serviceTitle, copy, images, video } = props;
  return (
    <StackedWrapper>
      <div className="w-full min-w-80">
        {video ? (
          <div className="relative mx-auto max-h-[768px] max-w-screen-sm overflow-hidden">
            {video && <VideoPlayer {...video} hideControls={true} />}
          </div>
        ) : images.length > 1 ? (
          <CarouselFade photos={images} slideClassName="flex-[0_0_100%]" />
        ) : (
          <div
            style={{ aspectRatio: `${images[0]!.width} / ${images[0]!.height}` }}
            className="relative mx-auto max-h-[768px] max-w-screen-sm"
          >
            <Image src={images[0]!.url} fill={true} alt={images[0]!.altText} />
            <div className="absolute left-0 top-0 z-[2] h-full w-full bg-radial-light dark:bg-radial-dark" />
          </div>
        )}
        <WhatGoesDownHeading
          headingLevel={2}
          serviceName={serviceTitle}
          className="relative z-10 -mt-4"
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
