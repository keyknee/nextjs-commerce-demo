'use client';
import clsx, { ClassValue } from 'clsx';
import { Image as ImageType } from 'lib/wix/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface VideoSrc {
  src: string;
  type: string;
}

export function AnimatedBanner({
  backgroundImgDetails,
  children,
  videoSrcSet,
  className
}: {
  backgroundImgDetails?: ImageType;
  className?: ClassValue;
  children?: React.ReactNode;
  videoSrcSet: VideoSrc[];
}) {
  const [videoReady, setVideoReady] = useState(false);

  function handleCanPlayThrough() {
    setVideoReady((prev) => !prev);
  }

  useEffect(() => {
    console.log(videoReady);
  }, [videoReady]);

  return (
    <div className={clsx('fixed flex w-full justify-center', className)}>
      <Image
        className="relative -top-40 -z-[1] aspect-[9/16] max-w-screen-lg"
        src={backgroundImgDetails?.url || ''}
        alt={backgroundImgDetails?.altText || ''}
        style={{ width: '100%' }}
        width={backgroundImgDetails?.width}
        height={backgroundImgDetails?.height}
      />
      <video
        className={`absolute -top-40 left-0 w-screen max-w-none ${videoReady ? 'block' : 'hidden'}`}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={handleCanPlayThrough}
      >
        {videoSrcSet.map((vid, i: number) => (
          <source key={i} {...vid} />
        ))}
      </video>
      {children}
    </div>
  );
}
