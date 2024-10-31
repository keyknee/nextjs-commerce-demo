import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Wix.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <div className="bg-page-header-img bg-full-fill relative min-h-screen">
        <div className="h-content relative z-10 mx-10">
          <h1 className="text-shadow-sm text-theme-secondary font-decorative-serif tracking-tightest py-[calc(33vh)] text-[calc(25vw)] font-semibold uppercase leading-tight min-[623px]:text-[10rem]">
            Total{' '}
            <span className="text-theme-primary font-decorative-script block normal-case tracking-normal">
              Tease
            </span>
            <span className="relative -top-[26vw] font-sans text-[calc(5vw)] font-normal uppercase tracking-normal text-white min-[623px]:-top-[160px] min-[623px]:text-3xl">
              Tease Me, Don't Touch Me!
            </span>
          </h1>
        </div>
      </div>

      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
