import Prose from 'components/prose';
import { BrandAccentedHeadings } from 'components/typography';
import { getSection, getTestimonials } from 'lib/wix';
import { Testimonial } from 'lib/wix/types';
import { ReactNode } from 'react';

export function Carousel({ children }: { children: ReactNode }) {
  return (
    <div
      id="carousel-slide"
      className="flex min-h-max flex-col gap-x-8 gap-y-16 overflow-x-scroll md:flex-row"
    >
      {children}
    </div>
  );
}

export function TestimonialQuote(props: Testimonial) {
  const { name, age, quote } = props;
  return (
    <div className="flex w-80 shrink-0 flex-col justify-between gap-8 border border-theme-primary/60 px-10 py-5">
      <p className="quote relative">{quote}</p>
      <p className="inline-flex gap-2">
        <span>{name} ,</span>{' '}
        <span className="font-decorative-script text-xl font-semibold tracking-wide">{age}</span>
      </p>
    </div>
  );
}

export default async function Testimonials() {
  const section = await getSection('Testimonials');
  const testimonials = await getTestimonials();
  return section ? (
    <>
      <BrandAccentedHeadings
        headingCopy={section.heading}
        headingLevel={2}
        variant="AccentFirstAndLast"
      />
      <Prose className="my-8" html={section.body as string} />
      <div id="carousel-window" className="relative mx-auto my-4 max-w-screen-xl md:flex-row">
        <Carousel>
          {testimonials.map((testimonial) => (
            <TestimonialQuote {...testimonial} key={testimonial.id} />
          ))}
        </Carousel>
      </div>
    </>
  ) : null;
}
