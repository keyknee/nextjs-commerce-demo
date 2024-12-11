import { CarouselFade } from 'components/embla-carousel';
import { MailingListForm } from 'components/forms';
// import { sectionFetcher } from 'components/page-sections';
import { AboutTotalTeaseExperienceSection, TestimonialsSection } from 'components/page-sections';
import { ProductShowcase } from 'components/product/showcase';
import { BrandAccentedHeadings } from 'components/typography';
import { getPage } from 'lib/wix';
import Image from 'next/image';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Wix.',
  openGraph: {
    type: 'website'
  }
};

interface CustomStyle extends React.CSSProperties {
  '--image-url': string;
}

export default async function HomePage() {
  const page = await getPage('home');
  return (
    <>
      <div>
        <div className="relative aspect-[9/16] w-full max-md:min-h-screen">
          <Image
            src={page?.headerImage?.url || ''}
            alt={page?.headerImage?.altText || ''}
            className="w-full"
            fill={true}
          />
          <div className="absolute left-0 top-0" />
          <div className="h-content relative z-10 mx-10">
            <h1 className="text-shadow-sm ml-[2.5vw] w-fit pt-[calc(40vh)] font-decorative-serif text-[calc(25vw)] font-semibold uppercase leading-tight tracking-tightest text-theme-secondary min-[623px]:text-[10rem] md:py-[calc(40vh)]">
              Total{' '}
              <span className="block font-decorative-script normal-case tracking-normal text-theme-primary">
                Tease
              </span>
            </h1>
          </div>
        </div>
        <AboutTotalTeaseExperienceSection />
        <section className="relative mx-auto w-full max-w-screen-xl px-5 lg:px-20">
          <BrandAccentedHeadings
            headingCopy="Indulgence Elevated to Art"
            headingLevel={2}
            variant="AccentFirstAndLast"
            animate={true}
            animateEntryDirection="bottom"
            className="relative z-[2] max-w-[340px] !text-left lg:top-10"
          />
          <CarouselFade photos={page?.photoGallery || []} slideClassName="flex-[0_0_100%]" />
        </section>
        <ProductShowcase
          CTAHeading={'Get Inspired'}
          subHeading={'Grab the Ultimate Entertainment eRead!'}
          productSlug={'sex-talk-101-ways-to-make-money-with-no-contact-sex-work'}
        />
        <TestimonialsSection />
        <MailingListForm />
      </div>
    </>
  );
}
