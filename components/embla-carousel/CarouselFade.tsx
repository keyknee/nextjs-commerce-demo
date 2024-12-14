'use client';
import clsx from 'clsx';
import { EmblaPluginType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import type { Image as ImageType } from 'lib/wix/types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

interface Props {
  photos: ImageType[];
  containerClassName?: string;
  slideClassName?: string;
}

export function CarouselFade(props: Props) {
  const { photos, containerClassName, slideClassName } = props;
  const plugins: EmblaPluginType[] = [Autoplay(), Fade()];
  const intersectionRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: false, duration: 30 }, plugins);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const isVisible = useIntersectionObserver(intersectionRef, { threshold: 0.1 });

  useEffect(() => {
    if (!isVisible) {
      emblaApi?.plugins().autoplay.stop();
    } else {
      emblaApi?.plugins().autoplay.play();
    }
  }, [isVisible]);

  return (
    <div className="embla" ref={intersectionRef}>
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className={clsx('embla__container embla-touch flex', containerClassName)}>
          {photos &&
            photos.map((photo, i: number) => (
              <div
                key={`${i}_${photo.id}`}
                className={clsx(
                  'embla__slide traslate3d-start w-full transition-all ease-in-out',
                  slideClassName
                )}
              >
                <Image
                  className="w-full"
                  src={photo.url}
                  height={photo.height}
                  width={photo.width}
                  alt={photo.altText}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="embla__dots mx-auto my-6 flex justify-center gap-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={clsx(
              'h-2.5 w-4 cursor-pointer rounded-full border-2 border-theme-secondary hover:border-theme-primary',
              'embla__dot'.concat(
                index === selectedIndex
                  ? `${' '}embla__dot--selected !border-theme-primary bg-theme-primary`
                  : ''
              )
            )}
          />
        ))}
      </div>
    </div>
  );
}
