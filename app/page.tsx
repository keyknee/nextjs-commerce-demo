import { Carousel } from 'components/carousel';
import { MailingListForm } from 'components/forms';
import { ThreeItemGrid } from 'components/grid/three-items';
import AboutTotalTeaseExperience from 'components/page-sections/about';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Wix.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <div className="bg-full-fill relative min-h-screen bg-page-header-img">
        <div className="h-content relative z-10 mx-10">
          <h1 className="text-shadow-sm py-[calc(33vh)] font-decorative-serif text-[calc(25vw)] font-semibold uppercase leading-tight tracking-tightest text-theme-secondary min-[623px]:text-[10rem]">
            Total{' '}
            <span className="block font-decorative-script normal-case tracking-normal text-theme-primary">
              Tease
            </span>
            <span className="relative -top-[26vw] font-sans text-[calc(5vw)] font-normal uppercase tracking-normal text-white min-[623px]:-top-[160px] min-[623px]:text-3xl">
              Tease Me, Don't Touch Me!
            </span>
          </h1>
        </div>
        <AboutTotalTeaseExperience />
        <MailingListForm />
      </div>

      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
